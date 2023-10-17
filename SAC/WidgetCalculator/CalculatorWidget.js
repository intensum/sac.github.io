(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
           
        .image-container {
        width: 100%;
        height: 100px;
            background:url('data:image/png;base64,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AADRBgCAaAMAEG0AAIg2AADRBgCAaAMAQLQBAIg2AABEGwAAog0AQLQBACDaAABEm2gDABBtAACINgAA0QYAgGgDAEC0AQCINgAARBsAAKINAEC0AQAg2gAARBsAAKINAADRBgAg2gAAEG0AAIg2AADRBgCAaAMAEG2iDQBAtAEAINoAAEQbAACiDQAA0QYAINoAABBtAACINgAA0QYAgGgDABBtAACINgAARBsAgGgDAEC0AQAg2gAARBsAAKINAADRBgAg2gAAEG0AAKINAADRBgCAaAMAEG0AAIg2AABEGwCAaAMAQLQBAIg2AABEGwAAog0AQLQBACDaAAAQbQAAog0AANEGAIBoAwAQbQAAiDYAANEGAIBoAwBAtAEAiDYAAEQbAACiDQBAtAEAINoAAEQbAACiDQAA0QYAINoAABBtAACINgAA0QYAgGgDAEC0AQCINgAARBsAgGgDAEC0AQAg2gAARBsAAKINAADRBgAg2gAAEG0AAKINAADRBgCAaAMAEG0AAIg2AABEGwCAaAMAQLQBACDaAABEGwAAog0AQLQBACDaAAAQbQAAog0AANEGAIBoAwAQbQAAiDYAANEGAIBoAwBAtAEAiDYAAEQbAACiDQBAtAEAINoAABBtAACiDQAA0QYAINoAABBtAACINgAA0QYAgGgDAEC0AQCINgAARBsAgGgDAEC0AQAg2gAARBsAAKINAADRBgAg2gAAEG0AAIg2AADRBgCAaAMAEG0AAIg2AABEGwCAaAMAQLQBACDaAABEGwAAog0AQLQBACDaAAAQbQAAog0AANEGAIBoAwAQbQAAiDYAAEQbAIBoAwBAtAEAiDYAAEQbAACiDQBAtAEAINoAABBtAACiDQAA0QYAINoAABBtAACINgAA0QYAgGgDAEC0AQCINgAARBsAAKINAEC0AQAg2gAARBsAAKINAADRBgAg2gAAEG0AAIg2AADRBgCAaAMAEG0AAIg2AABEGwCAaAMAQLQBACDaAABEGwAAog0AANEGACDaAAAQbQAAog0AANEGAMBl/wgwALTrcyYBwcwwAAAAAElFTkSuQmCC') no-repeat center center;

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
