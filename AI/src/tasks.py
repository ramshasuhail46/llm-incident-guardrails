from src.celery_app import celery_app
from src.engine import ReasoningEngine

# Initialize your core engine once (not inside the task for better performance)
engine = ReasoningEngine()

@celery_app.task(name="diagnose_incident_task")
def diagnose_incident_task(signals_data):
    """
    Background task to run the AI reasoning logic.
    Analyzes incident signals and generates a diagnosis using the ReasoningEngine.
    """
    # This calls the Phase 4 logic you already built!
    result = engine.generate_diagnosis(signals_data)
    
    # We return the dict so Celery can serialize it into Redis
    return result.model_dump()