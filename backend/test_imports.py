#!/usr/bin/env python
import sys
sys.path.insert(0, '.')

print("Testing imports...")

try:
    from core.config import settings
    print("✓ core.config imported")
except Exception as e:
    print(f"✗ core.config: {e}")

try:
    from core.prompt_manager import get_system_instruction
    print("✓ core.prompt_manager imported")
except Exception as e:
    print(f"✗ core.prompt_manager: {e}")

try:
    from models.schemas import GeneratedAssessment
    print("✓ models.schemas imported")
except Exception as e:
    print(f"✗ models.schemas: {e}")

try:
    from services.pdf_processor import extract_text_from_document
    print("✓ services.pdf_processor imported")
except Exception as e:
    print(f"✗ services.pdf_processor: {e}")

try:
    from services.assessment_engine import generate_mcqs
    print("✓ services.assessment_engine imported")
except Exception as e:
    print(f"✗ services.assessment_engine: {e}")

try:
    from api.routes import router
    print("✓ api.routes imported")
except Exception as e:
    print(f"✗ api.routes: {e}")

try:
    from main import app
    print("✓ main imported")
except Exception as e:
    print(f"✗ main: {e}")

print("\nAll imports tested!")
