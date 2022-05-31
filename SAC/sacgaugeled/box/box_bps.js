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
							max: this.max
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
	}

	customElements.define("com-fd-gaugeled-bps", BoxBps);
})();