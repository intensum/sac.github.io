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
		var data = [];

		for (var i = 0; i <= 360; i++) {
		  var t = (i / 180) * Math.PI;
		  var r = Math.sin(2 * t) * Math.cos(2 * t);
		  data.push([r, i]);
		}
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
				data: [820, 100, 901, 934, 1290, 1330, 1320],
				type: 'line',
				smooth: true
			  }
			]
		  };
		
//		option && myChart.setOption(option);
		
		chart.setOption(option)
	  }
	}
  
	customElements.define('com-sap-sample-echarts-prepared2', SamplePrepared)
  })()