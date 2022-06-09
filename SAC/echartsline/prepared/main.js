var getScriptPromisify = (src) => {
	return new Promise(resolve => {
	  $.getScript(src, resolve)
	})
  }
  
  (function () {
	const prepared = document.createElement('template')
	prepared.innerHTML = `
		<style>
		</style>
		<div id="root" style="width: 100%; height: 100%;">
		</div>
	  `
	class SamplePrepared extends HTMLElement {
	  constructor () {
		super()
  
		this._shadowRoot = this.attachShadow({ mode: 'open' })
		this._shadowRoot.appendChild(prepared.content.cloneNode(true))
  
		this._root = this._shadowRoot.getElementById('root')
  
		this._props = {}
  
		this.render()
	  }
  
	  onCustomWidgetResize (width, height) {
		this.render()
	  }
  
	  async render () {
		await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')
  
		const chart = echarts.init(this._root)
		const option = {
			xAxis: {
			  type: 'category',
			  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
			  type: 'value'
			},
			series: [
			  {
				data: [150, 230, 224, 218, 135, 147, 260],
				type: 'line'
			  }
			]
		  };
		chart.setOption(option)
	  }
	}
  
	customElements.define('com-sap-sample-echarts-prepared', SamplePrepared)
  })()