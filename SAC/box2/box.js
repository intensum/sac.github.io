(function() {
 let template = document.createElement("template");
 template.innerHTML = `
 <div class="container">
 <div class="row">
   <div class="col-md-4 col-sm-4">
     <div class="metric participation" data-ratio=".95">
       <svg viewBox="0 0 1000 500">
           <path d="M 950 500 A 450 450 0 0 0 50 500"></path>
           <text class='percentage' text-anchor="middle" alignment-baseline="middle" x="500" y="300" font-size="140" font-weight="bold">10%</text>
           <text class='title' text-anchor="middle" alignment-baseline="middle" x="500" y="450" font-size="90" font-weight="normal"></text>
         </svg>
     </div>
   </div>
 </div>
</div>
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
 }
 customElements.define("com-sample-box2", Box);
})();
