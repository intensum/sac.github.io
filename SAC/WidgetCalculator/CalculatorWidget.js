(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
           
    <input type="text" class="display" disabled>

            <div class="buttons">
        <button>%</button>
        <button class="reset">C</button>
        <button><</button>
        <button>/</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>+</button>
        <button>0</button>
        <button>.</button>
        <button class="double-width special-color">=</button>

       
            </div>
    <a href="https://www.linkedin.com/company/intensum" target="_blank" class="follow-link">Follow us on Linkedin - Intensum</a>
        </div>
    `;

   
   
 
    class Calculator extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

        this._display = this._shadowRoot.querySelector('.display');
        this._buttons = Array.from(this._shadowRoot.querySelectorAll('button'));
        this._operation = '';
        this._newOperation = true;
         this._decimalPlaces = 2; // default decimal places
               this._props = {}; // properties 
          this._buttons.forEach(button => {
            button.addEventListener('click', this._onButtonClick.bind(this));
        });
        
    }

 onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
    }


        
onCustomWidgetAfterUpdate(changedProperties) {
        if ("decimalPlaces" in changedProperties) {
            this._decimalPlaces = changedProperties["decimalPlaces"];
        }
   if ("equalColor" in changedProperties) {
        this._updateEqualColor(this.equalColor);
    }
    if ("clearColor" in changedProperties) {
        this._updateClearColor(this.clearColor);
    }
     if ("numberColor" in changedProperties) {
        this._updateNumberColor(changedProperties["numberColor"]);
    }

    if ("dataBinding" in changedProperties) {
            this._dataBinding = changedProperties["dataBinding"];
            // Update your widget's data binding here
        }
    
    }     
      
 connectedCallback() {

        this._shadowRoot.querySelector('button').addEventListener('click', async () => {
            const dataBinding = this.dataBindings.getDataBinding('myDataBinding');
            await dataBinding.addDimensionToFeed("dimensions", dimensionId);

            // Traverse result set
            this.myDataBinding.data.forEach(row => {
                // Parse row
                console.log(row);
            });
        });
    }
        
        
_updateEqualColor(color) {
    const equalButton = this._shadowRoot.querySelector('.buttons > button.double-width');
    equalButton.style.backgroundColor = color;
}

_updateClearColor(color) {
    const clearButton = this._shadowRoot.querySelector('.buttons > button.reset');
    clearButton.style.backgroundColor = color;
}

_updateNumberColor(color) {
    const buttons = this._shadowRoot.querySelectorAll('.buttons > button');
    buttons.forEach(button => {
        button.style.color = color;
    });
}
  
          
        
    _onButtonClick(event) {
        const value = event.target.textContent;

        if (this._newOperation && ['+', '-', '*', '/'].includes(value)) {
            this._operation = this._display.value + ' ' + value + ' ';
            this._newOperation = false;
        } else {
            switch(value) {
                case '+':
                case '-':
                case '*':
                case '/':
                    this._operation += ` ${value} `;
                    break;
                case '=':
                    try {
                        let result = eval(this._operation.replace(/\s/g, ''));
                        this._display.value = result.toFixed(this._decimalPlaces);
                        this._operation = '';
                        this._newOperation = true;
                //  the onCalculation event after calculation
             let calculationEvent = new CustomEvent('onCalculation', { detail: { result: this._display.value } });
            this.dispatchEvent(calculationEvent);
                    } catch(e) {
                        console.error(e);
                        this._display.value = 'Error';
                        this._operation = '';
                        this._newOperation = true;
                    }
                    break;
                case '%':
                try {
                    this._operation = (parseFloat(this._operation) / 100).toString();
                    this._display.value = this._operation;
                } catch(e) {
                    console.error(e);
                    this._display.value = 'Error';
                    this._operation = '';
                    this._newOperation = true;
                }
                     break;
                case 'C':
                    this._operation = '';
                    break;
                case '<':
                    this._operation = this._operation.slice(0, -1);
                    break;
                case '%':
                    let lastNumber = this._operation.split(' ').pop();
                    this._operation = this._operation.replace(new RegExp(lastNumber + '$'), lastNumber + '/100');
                    break;
                default:
                    this._operation += value;
            }
        }

        if (value !== '=') {
            this._display.value = this._operation;
        }
    }
}

customElements.define('calculator-widget', Calculator);
})();
