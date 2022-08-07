(() => {
    const bmrFormula = (gender, kg, cm, age, ratio) => ~~((((10 * kg) + (6.25 * cm) - (5 * age) + 5) * ratio) + ((gender === 'female') ? -161 : 5));
    
    const DOM = {
      input: {
        gender: document.getElementById('gender-input'),
        weight: document.getElementById('weight-input'),
        height: document.getElementById('height-input'),
        age: document.getElementById('age-input'),
        ratio: document.getElementById('ratio-input'),
        proteins: document.getElementById('proteins-input'),
        fat: document.getElementById('fat-input'),
        surplus: document.getElementById('surplus-input'),
      },
      outputValue: {
        bmr: document.getElementById('bmr-output'),
        proteins: document.getElementById('proteins-output'),
        carbs: document.getElementById('carbs-output'),
        fat: document.getElementById('fat-output')
      },
      output: document.getElementById('output'),
      submit: document.getElementById('submit'),
      info: document.querySelectorAll('.info')
    };
    
    function validateForm () {
      const rules = {
        gender: {
          required: true
        },
        weight: {
          required: true,
          minValue: 0
        },
        height: {
          required: true,
          minValue: 0
        },
        age: {
          required: true,
          minValue: 0
        },
        ratio: {
          required: true,
          minValue: 1.2,
          maxValue: 1.9
        },
        proteins: {
          required: true,
          minValue: 1.8,
          maxValue: 2
        },
        fat: {
          required: true,
          minValue: 20,
          maxValue: 30
        },
        surplus: {
          minValue: -1000,
          maxValue: 1000
        }
      };
      
      let isFormValid = true;
      let index = 0;
      let value;
      let valid;
      let info;
      for (const key in rules) {
        valid = true;
        info = '';
        value = DOM.input[key].value;
  
        for (const rule in rules[key]) {
          if (!valid) {
            break;
          }
  
          if (rule === 'required') {
            valid = value.length !== 0 && valid;
            if (!valid) {
              info = 'This field is required.';
            }
          }
  
          if (rule === 'minValue') {
            if (!value.length) {
              value = 0;
            }
            
            valid = parseFloat(value) >= parseFloat(rules[key][rule]) && valid;
            if (!valid) {
              info = `This value should be greater/equal ${rules[key][rule]}.`;
            }
          }
  
          if (rule === 'maxValue') {
            if (!value.length) {
              value = 0;
            }
            
            valid = parseFloat(value) <= parseFloat(rules[key][rule]) && valid;
            if (!valid) {
              info = `This value should be less/equal ${rules[key][rule]}.`;
            }
          }
        }
  
        isFormValid = valid && isFormValid;
        (!valid) ? DOM.input[key].classList.add('invalid') : DOM.input[key].classList.remove('invalid');
        DOM.info[index].textContent = info;
  
        index++;
      }
      
      return isFormValid;
    }
    
    function getFormData () {
      const data = {};
      let floatValue;
      
      for (const key in DOM.input) {
        floatValue = parseFloat(DOM.input[key].value);
        data[key] = (!isNaN(floatValue)) ? floatValue : DOM.input[key].value;
      }
      
      return data;
    }
    
    function outputData (data) {
      for (const key in data) {
        DOM.outputValue[key].textContent = data[key];
      }
    }
    
    function handleSubmit (event) {
      event.preventDefault();
      const isFormValid = validateForm();
      if (isFormValid) {
        const formData = getFormData();
        console.log(formData);
        const bmr = bmrFormula(
          formData.gender,
          formData.weight,
          formData.height,
          formData.age,
          formData.ratio
        ) + formData.surplus;
        const proteins = ~~(formData.proteins * formData.weight);
        const fat = ~~((bmr * (formData.fat / 100)) / 9);
        const carbs = ~~((bmr - ((proteins * 4) + (fat * 9))) / 4);
        const output = { bmr, proteins, carbs, fat };
  
        outputData(output);
        DOM.output.classList.remove('hidden');
      }
    }
    
    DOM.submit.addEventListener('click', handleSubmit);
  })();