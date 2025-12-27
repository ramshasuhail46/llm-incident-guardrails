from pydantic import BaseModel
from typing import List


class Hypothesis(BaseModel):
    rank: int
    cause: str
    evidence: List[str]
    confidence: float
    mitigation_strategy: str


class IncidentDiagnosis(BaseModel):
    incident_id: str
    is_escalated: bool
    hypotheses: List[Hypothesis]
    summary: str

