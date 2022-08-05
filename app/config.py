import sys
sys.dont_write_bytecode = True

from dotenv import load_dotenv
import os
## Fetching Env vars

SECRET_KEY = os.getenv('SECRET_KEY')
FLASK_DEBUG = os.getenv('FLASK_DEBUG')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))