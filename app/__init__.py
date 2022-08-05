import sys
sys.dont_write_bytecode = True
from os import environ
from flask import Flask, render_template, flash
from app.routes.views import views
from .config import load_dotenv


def configure():
    load_dotenv()

def create_app(config_file='config.py'):
    configure()
        
    app = Flask(__name__, template_folder = 'templates')
    
    app.config.from_pyfile(config_file)
    app.register_blueprint(views, url_prefix='/')

    
    @app.errorhandler(404)
    def page_not_found(e):
        flash('Sorry page couldn\'t be found.', 'danger')
        return render_template('404.html', title='Page Not Found (404) - BMI Calculator'), 404

    @app.errorhandler(500)
    def internal_server_error(e):
        flash('This been caused from a server issue or you submitted no data in the calculator. Try again.', 'danger')
        return render_template('500.html', title='Internal Server Error (500) - BMI Calculator'), 500

    return app
