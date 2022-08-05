import sys
sys.dont_write_bytecode = True
from os import environ
from flask import Flask
from app.routes.views import views
from .config import load_dotenv


def configure():
    load_dotenv()

def create_app(config_file='config.py'):
    configure()
        
    app = Flask(__name__, template_folder = 'templates')
    
    app.config.from_pyfile(config_file)
    app.register_blueprint(views, url_prefix='/')

    return app