(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<form method='post' action='https://jsfiddle.net/api/post/library/pure/' target="_blank">
   <input type='submit' value='Code it yourself on JSFiddle' class='button'/>
   <input type='hidden' name='title' value='Gauge Chart Example'/>
   <textarea name='html' style="display:none;">
&lt;script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"&gt;&lt;/script&gt;
     &lt;div id=&quot;gauge_div&quot; style=&quot;width:280px; height: 140px;&quot;&gt;&lt;/div&gt;
  &lt;input type=&quot;button&quot; value=&quot;Go Faster&quot; onclick=&quot;changeTemp(1)&quot; /&gt;
  &lt;input type=&quot;button&quot; value=&quot;Slow down&quot; onclick=&quot;changeTemp(-1)&quot; /&gt;
   </textarea>
   <textarea name='js' style="display:none;">    google.charts.load(&#39;current&#39;, {&#39;packages&#39;:[&#39;gauge&#39;]});
    google.charts.setOnLoadCallback(drawGauge);

    var gaugeOptions = {min: 0, max: 280, yellowFrom: 200, yellowTo: 250,
      redFrom: 250, redTo: 280, minorTicks: 5};
    var gauge;

    function drawGauge() {
      gaugeData = new google.visualization.DataTable();
      gaugeData.addColumn(&#39;number&#39;, &#39;Engine&#39;);
      gaugeData.addColumn(&#39;number&#39;, &#39;Torpedo&#39;);
      gaugeData.addRows(2);
      gaugeData.setCell(0, 0, 120);
      gaugeData.setCell(0, 1, 80);

      gauge = new google.visualization.Gauge(document.getElementById(&#39;gauge_div&#39;));
      gauge.draw(gaugeData, gaugeOptions);
    }

    function changeTemp(dir) {
      gaugeData.setValue(0, 0, gaugeData.getValue(0, 0) + dir * 25);
      gaugeData.setValue(0, 1, gaugeData.getValue(0, 1) + dir * 20);
      gauge.draw(gaugeData, gaugeOptions);
    }</textarea>
   <input type='hidden' name='css' value=''/>
   <input type='hidden' name='description' value='An example of a Google Gauge Chart, with buttons that control it'/>
   <input type='hidden' name='dtd' value='html 5'/>
   <input type='hidden' name='wrap' value='b'/>
 </form>`;

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
        }
    });
})();