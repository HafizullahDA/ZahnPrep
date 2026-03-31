import uvicorn
import os
import sys
from pathlib import Path

# Ensure we're in the backend directory
backend_dir = Path(__file__).parent
os.chdir(backend_dir)
sys.path.insert(0, str(backend_dir))

# Load environment variables before importing anything else
from dotenv import load_dotenv
load_dotenv()

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
