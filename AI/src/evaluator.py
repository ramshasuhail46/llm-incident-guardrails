import os
import sys
from pathlib import Path

# Add parent directory to path to allow imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.engine import ReasoningEngine

def run_evaluation():
    engine = ReasoningEngine()
    # Use paths relative to project root
    project_root = Path(__file__).parent.parent
    test_files = [
        project_root / "data" / "mock_signals.json",    # DB Issue
        project_root / "data" / "memory_leak.json",     # Memory Issue
        project_root / "data" / "network_outage.json"   # Network Issue
    ]
    
    print(f"{'File':<30} | {'Top Cause':<30} | {'Conf':<5} | {'Escalated'}")
    print("-" * 85)

    for file_path in test_files:
        try:
            data = engine.load_signals(str(file_path))
            result = engine.generate_diagnosis(data)
            
            top_cause = result.hypotheses[0].cause[:30]
            conf = result.hypotheses[0].confidence
            esc = result.is_escalated
            
            print(f"{file_path.name:<30} | {top_cause:<30} | {conf:<5} | {esc}")
        except Exception as e:
            print(f"Error testing {file_path}: {e}")

# if __name__ == "__main__":
#     run_evaluation()