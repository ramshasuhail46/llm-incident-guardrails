import json
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI 

# Add parent directory to path to allow imports
sys.path.insert(0, str(Path(__file__).parent.parent))

# Load environment variables
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from src.prompt import SYSTEM_PROMPT 
from src.models import IncidentDiagnosis

class ReasoningEngine:
    def __init__(self, confidence_threshold: float = None):
        # Initialize Threshold from .env or default
        if confidence_threshold is None:
            self.threshold = float(os.getenv("CONFIDENCE_THRESHOLD", "0.7"))
        else:
            self.threshold = confidence_threshold
        
        # Initialize the client 
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def load_signals(self, filepath: str):
        with open(filepath, 'r') as f:
            return json.load(f)

    def generate_diagnosis(self, raw_data: dict) -> IncidentDiagnosis:
        try:
            user_content = f"Analyze these signals: {json.dumps(raw_data)}"

            # Call the LLM (LLM Reasoning Layer)
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                response_format={ "type": "json_object" }, 
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_content}
                ]
            )

            # Parse raw response
            ai_output = json.loads(response.choices[0].message.content)

            # Validation via Pydantic
            diagnosis = IncidentDiagnosis(**ai_output)

            # Confidence & Abstention Logic
            if diagnosis.hypotheses:
                top_conf = max(h.confidence for h in diagnosis.hypotheses)
                diagnosis.is_escalated = top_conf < self.threshold
            else:
                diagnosis.is_escalated = True # Escalate if no hypotheses are generated

            return diagnosis

        except Exception as e:
            # If AI fails, MUST escalate to a human
            print(f"Logic failure or API error: {e}")
            return IncidentDiagnosis(
                incident_id=raw_data.get("incident_id", "UNKNOWN"),
                is_escalated=True,
                hypotheses=[],
                summary=f"SYSTEM FAILURE: AI Reasoning Engine encountered an error: {str(e)}"
            )
