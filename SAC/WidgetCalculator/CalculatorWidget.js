(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
           
        .image-container {
        width: 100%;
        height: 100px;
            background:url('data:image/png;base64,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') no-repeat center center;

        background-size: cover;
    }
            .calculator {
                display: flex;
                flex-direction: column;
                width: 200px;
                background-color: #f0f0f0;
                border-radius: 4px;
                padding: 10px;
            }

            .display {
                margin-bottom: 10px;
                background-color: #fff;
                height: 30px;
                border: none;
                padding: 5px;
                text-align: right;
                border-radius: 4px;
            }
            .follow-link {
        font-size: 10px;
               }
            .buttons {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 5px;
            }

            .buttons > button {
                height: 30px;
                border: none;
                color: #fff;
                border-radius: 4px;
            }

            .buttons > button:active {
                transform: scale(0.95);
            }
    .buttons > button.reset {
        background-color: red;
    }

            .buttons > button:not(.special-color):nth-child(4n+1),
            .buttons > button:not(.special-color):nth-child(4n+4) {
                background-color: orange;
            }

            .buttons > button:not(.special-color):nth-child(4n+2),
            .buttons > button:not(.special-color):nth-child(4n+3) {
                background-color: #5F6A9D;
            }

            .buttons > button:nth-child(5) {
                background-color: red;
            }

            .buttons > button:last-child {
                background-color: green;
                grid-column: span 2;
            }
        </style>
        <div class="calculator">
    <div class="image-container"></div> 
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
