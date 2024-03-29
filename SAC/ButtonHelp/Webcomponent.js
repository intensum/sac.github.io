(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<button type="button" id="myBtn">Helper Button</button>` ;   
   
    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }

        init() {            
              
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.fireChanged();
            this.fireChanged2();         
            this.dispatchEvent(event);
            });            
        }

        fireChanged() {
            console.log("OnClick Triggered");     
            console.log("re 1 OnClick Triggered");
        }        
        fireChanged2() {   
            console.log("re 2 OnClick Triggered");
        } 
    }

    customElements.define('custom-button', PerformanceHelp);
})();
