(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Gauge Properties</legend>
				<table>
					<tr>
						<td>Title</td>
						<td><input id="bps_title" type="text" size="50" maxlength="20"></td>
					</tr>
					<tr>
						<td>Sub Title</td>
						<td><input id="bps_subtitle" type="text" size="50" maxlength="20"></td>
					</tr>
					<tr>
					<td>min</td>
						<td><input id="bps_min" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>max</td>
						<td><input id="bps_max" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>redfrom</td>
						<td><input id="bps_redfrom" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>redto</td>
						<td><input id="bps_redto" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>yellowfrom</td>
						<td><input id="bps_yellowfrom" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>yellowto</td>
						<td><input id="bps_yellowto" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>greenfgrom</td>
						<td><input id="bps_greenfrom" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>greento</td>
						<td><input id="bps_greento" type="text" size="50" maxlength="10"></td>
					</tr>
					<tr>
						<td>minorticks</td>
						<td><input id="bps_minorticks" type="text" size="50" maxlength="10"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class BoxBps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}
 

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							subtitle: this.subtitle,
							min: this.min,
							max: this.max,
							redfrom: this.redfrom,
							redto: this.redto,
							yellowfrom: this.yellowfrom,
							yellowto: this.yellowto,
							greenfrom: this.greenfrom,
							greento: this.greento,
							minorticks: this.redfrom
						}
					}
			}));
		}

		set title(title) {
			this._shadowRoot.getElementById("bps_title").value = title;
		}		
		set subtitle(subtitle) {
			this._shadowRoot.getElementById("bps_subtitle").value = subtitle;
		}		
		set min(min) {
			this._shadowRoot.getElementById("bps_min").value = min;
		}		
		set max(max) {
			this._shadowRoot.getElementById("bps_max").value = max;
		}
		set redfrom(redfrom) {
			this._shadowRoot.getElementById("bps_redfrom").value = redfrom;
		}
		set redto(redto) {
			this._shadowRoot.getElementById("bps_redto").value = redto;
		}
		set yellowfrom(yellowfrom) {
			this._shadowRoot.getElementById("bps_yellowfrom").value = yellowfrom;
		}
		set yellowto(yellowto) {
			this._shadowRoot.getElementById("bps_yellowto").value = yellowto;
		}
		set greenfrom(greenfrom) {
			this._shadowRoot.getElementById("bps_greenfrom").value = greenfrom;
		}
		set greento(greento) {
			this._shadowRoot.getElementById("bps_greento").value = greento;
		}
		set minorticks(minorticks) {
			this._shadowRoot.getElementById("bps_minorticks").value = minorticks;
		}

		//////////////		
		get title() {
			return this._shadowRoot.getElementById("bps_title").value;
		}		
		get subtitle() {
			return this._shadowRoot.getElementById("bps_subtitle").value;
		}		
		get min() {
			return this._shadowRoot.getElementById("bps_min").value;
		}		
		get max() {
			return this._shadowRoot.getElementById("bps_max").value;
		}		
		get redfrom() {
			return this._shadowRoot.getElementById("bps_redfrom").value;
		}		
		get redto() {
			return this._shadowRoot.getElementById("bps_redto").value;
		}		
		get yellowfrom() {
			return this._shadowRoot.getElementById("bps_yellowfrom").value;
		}		
		get yellowto() {
			return this._shadowRoot.getElementById("bps_yellowto").value;
		}		
		get greenfrom() {
			return this._shadowRoot.getElementById("bps_greenfrom").value;
		}		
		get greento() {
			return this._shadowRoot.getElementById("bps_greento").value;
		}		
		get minorticks() {
			return this._shadowRoot.getElementById("bps_minorticks").value;
		}		
	}

	customElements.define("com-fd-sacgauge-bps", BoxBps);
})();