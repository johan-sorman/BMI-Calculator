from flask import Blueprint, redirect, render_template, request, url_for, flash

## Register Blueprint ##
views = Blueprint(
    'views',
    __name__,
    url_prefix='/',
    template_folder='templates',
    static_folder='static'
)

## Render homepage ##
@views.route('/')
def home():
    return render_template('index.html', title="Home - BMI Calculator")

## Render Calculator page ##
@views.route('/bmi_calculator', methods=['POST', 'GET'])
def calc():
    bmi=''
    if request.method == 'POST' and 'weight' in request.form and 'height' in request.form:
        w = float(request.form.get('weight'))
        h = float(request.form.get('height'))
        bmi = round(w/((h/100)**2),2)

    return render_template('calc.html', bmi=bmi, title="BMI Calculator")