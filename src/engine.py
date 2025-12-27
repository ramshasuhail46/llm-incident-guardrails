import json
import sys
from pathlib import Path

# Add parent directory to path to allow imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.models import IncidentDiagnosis, Hypothesis

class ReasoningEngine:
    def __init__(self, confidence_threshold: float = 0.7):
        self.threshold = confidence_threshold

    def load_signals(self, filepath: str):
        with open(filepath, 'r') as f:
            return json.load(f)

    def generate_diagnosis(self, raw_data: dict) -> IncidentDiagnosis:
        # Section 6: Reasoning & Synthesis
        # In a full build, this is where the LLM prompt lives.
        # For now, we simulate these hypotheses in the code.
        
        hypotheses = [
            Hypothesis(
                rank=1,
                cause="Connection Pool Exhaustion",
                evidence=["CPU usage at 92%", "Logs show auth-db exhausted"],
                confidence=0.85,
                mitigation_strategy="Increase max_connections or scale DB instance."
            ),
            Hypothesis(
                rank=2,
                cause="Deployment Regression",
                evidence=["Incident started 5 mins after v2.4.1 deployment"],
                confidence=0.45,
                mitigation_strategy="Rollback auth-api to v2.4.0."
            )
        ]

        top_confidence = max(h.confidence for h in hypotheses)
        should_escalate = top_confidence < self.threshold

        return IncidentDiagnosis(
            incident_id=raw_data["incident_id"],
            is_escalated=should_escalate,
            hypotheses=hypotheses,
            summary="High CPU and database connection errors suggest resource exhaustion."
        )

if __name__ == "__main__":
    engine = ReasoningEngine()
    data = engine.load_signals("data/mock_signals.json")
    result = engine.generate_diagnosis(data)
    print(result.model_dump_json(indent=2))