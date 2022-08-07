from asyncio import wait
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
@views.route('/BMI', methods=['POST', 'GET'])
def bmi():
    # BMI=''
    # if request.method == 'POST' and 'weight' in request.form and 'height' in request.form:
    #     w = float(request.form.get('weight'))
    #     h = float(request.form.get('height'))
    #     BMI = round(w/((h/100)**2),1)

    #     ## Set BMI category based on user input ##
    #     if BMI <= 18.5:
    #         category = "underweight"
    #     elif BMI<=24.9:
    #         category = "normalweight"
    #     elif BMI<=29.9:
    #         category = "overweight"
    #     elif BMI<=39.9:
    #         category = "obese"
    #     else:
    #         category = "severe obese"
    #     flash("Your BMI indicates you are {0}. Your BMI is {1}".format(category, BMI), 'success')

    return render_template('bmi.html', title="BMI Calculator")


@views.route('/BMR', methods=['POST', 'GET'])
def bmr():
    return render_template('bmr.html', title="BMR Calculator")
