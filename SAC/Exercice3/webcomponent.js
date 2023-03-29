(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<h1>Hello Super Mini World</h1>`;

    customElements.define('com-sap-sample-exercice3', class exercice3 extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {
            this._props = { ...this._props, ...changedProperties };
		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
            redraw()
        }
        */

        redraw(){

            google.charts.load('current', {'packages':['gauge']});
            google.charts.setOnLoadCallback(drawGauge);
        
            var gaugeOptions = {min: 0, max: 280, yellowFrom: 200, yellowTo: 250,
              redFrom: 250, redTo: 280, minorTicks: 5};
            var gauge;
        
            function drawGauge() {
              gaugeData = new google.visualization.DataTable();
              gaugeData.addColumn('number', 'Engine');
              gaugeData.addColumn('number', 'Torpedo');
              gaugeData.addRows(2);
              gaugeData.setCell(0, 0, 120);
              gaugeData.setCell(0, 1, 80);
        
              gauge = new google.visualization.Gauge(document.getElementById('gauge_div'));
              gauge.draw(gaugeData, gaugeOptions);
            }
        
            function changeTemp(dir) {
              gaugeData.setValue(0, 0, gaugeData.getValue(0, 0) + dir * 25);
              gaugeData.setValue(0, 1, gaugeData.getValue(0, 1) + dir * 20);
              gauge.draw(gaugeData, gaugeOptions);
            }
        }
    });
})();
