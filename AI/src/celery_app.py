from celery import Celery
import os
import sys
import logging
from pathlib import Path
from dotenv import load_dotenv

# Add parent directory to path to allow imports
sys.path.insert(0, str(Path(__file__).parent.parent))

# Load environment variables
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

# Get Redis URL from environment or use default
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
CELERY_APP_NAME = os.getenv("CELERY_APP_NAME", "sre_tasks")
CELERY_QUEUE_NAME = os.getenv("CELERY_QUEUE_NAME", "sre_incidents")

celery_app = Celery(
    CELERY_APP_NAME, broker=REDIS_URL, backend=REDIS_URL
)

# Configure Celery settings
celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

# Route project tasks to a consistent queue
celery_app.conf.task_routes = {
    'diagnose_incident_task': {'queue': CELERY_QUEUE_NAME},
    'heartbeat': {'queue': CELERY_QUEUE_NAME},
}

# Set up logging
logger = logging.getLogger(__name__)

# Import and initialize ReasoningEngine
# Initialize once (not inside the task for better performance)
from src.engine import ReasoningEngine
engine = ReasoningEngine()

# Heartbeat task definition (explicit name to avoid module path mismatch)
@celery_app.task(name='heartbeat')
def heartbeat():
    """
    Health check task to verify Celery worker is running.
    """
    logger.info("Heartbeat task received!")
    return "Heartbeat success!"

@celery_app.task(name="diagnose_incident_task")
def diagnose_incident_task(signals_data):
    """
    Background task to run the AI reasoning logic.
    Analyzes incident signals and generates a diagnosis using the ReasoningEngine.
    
    Args:
        signals_data: Dict containing incident signals (metrics, logs, deployments)
                     or a list containing a single dict (for compatibility)
    """
    try:
        # Handle case where data might be passed as a list (from some clients)
        if isinstance(signals_data, list) and len(signals_data) > 0:
            signals_data = signals_data[0]
        elif not isinstance(signals_data, dict):
            raise ValueError(f"Expected dict or list with dict, got {type(signals_data)}")
        
        logger.info(f"Processing diagnosis for incident: {signals_data.get('incident_id', 'UNKNOWN')}")
        result = engine.generate_diagnosis(signals_data)
        
        return result.model_dump()
    except Exception as e:
        logger.error(f"Error in diagnose_incident_task: {e}", exc_info=True)
        # Return error response that matches the expected format
        incident_id = "UNKNOWN"
        if isinstance(signals_data, dict):
            incident_id = signals_data.get("incident_id", "UNKNOWN")
        elif isinstance(signals_data, list) and len(signals_data) > 0 and isinstance(signals_data[0], dict):
            incident_id = signals_data[0].get("incident_id", "UNKNOWN")
        
        return {
            "incident_id": incident_id,
            "is_escalated": True,
            "hypotheses": [],
            "summary": f"SYSTEM FAILURE: Task encountered an error: {str(e)}"
        }