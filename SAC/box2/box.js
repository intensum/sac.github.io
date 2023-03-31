(function() {
 let template = document.createElement("template");
 template.innerHTML = `
 <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <div id="chart_div" style="width: 400px; height: 120px;"></div>
 `;     
 class Box extends HTMLElement {
 constructor() {
 super(); 
 let shadowRoot = this.attachShadow({mode: "open"});
 shadowRoot.appendChild(template.content.cloneNode(true));

 this.addEventListener("click", event => {
    var event = new Event("onClick"); 
    console.log("ceci est l event de lasch");
    this.dispatchEvent(event);
    });
    this._props = {};
}
// function drawChart() {
drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Memory', 80],
      ['CPU', 55],
      ['Network', 68]
    ]);

    var options = {
      width: 400,
      height: 120,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

    chart.draw(data, options);
 }

 onCustomWidgetBeforeUpdate(changedProperties) {
    this._props = { ...this._props, ...changedProperties };
 }

 onCustomWidgetAfterUpdate(changedProperties) {
    if ("color" in changedProperties) {
    this.style["background-color"] = changedProperties["color"];
    }
    if ("opacity" in changedProperties) {
    this.style["opacity"] = changedProperties["opacity"];
    }
 }
 
 customElements.define("com-sample-box2", Box);
})();
