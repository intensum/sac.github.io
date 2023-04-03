(function() {
    let shadowRoot;

    let ArMbit = [], Ar = [], ArData = [], ArOptions = [], ArChart = [], ArPubNub = [];

    let template = document.createElement("template");
    template.innerHTML = `
        <style type="text/css"> 
        </style>       
    `;

    const pubnubjs = "https://intensum.github.io/sac.github.io/SAC/Gauge/SACGoogleGauge/box/pubnub.4.21.7.min.js";
    const gaugejs =  "https://intensum.github.io/sac.github.io/SAC/Gauge/SACGoogleGauge/box/t.js";

    let googleloaderjs = document.createElement("script");
    googleloaderjs.src = "https://www.gstatic.com/charts/loader.js";

    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.addEventListener("load", callback);
        shadowRoot.appendChild(script);
    };

    // Google Chart
    function GoogleChart(divstr, text, value, firsttime) {
        google.setOnLoadCallback(function() {
               drawChart(divstr, text, value, firsttime);
        });
    };

    function drawChart(divstr, text, value, firsttime) {
        if (firsttime === 0) {

            const uuid = PubNub.generateUUID();
            const pubnub = new PubNub({
                publishKey: "",
                subscribeKey: "",
                uuid: uuid
            });

            var foundIndex = ArData.findIndex(x => x.id == text);
            if (foundIndex === -1) {
                console.log("dans le if");
                var data = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    [text, value]
                ]);

                ArData.push({
                    'id': text,
                    'data': data
                });
                var test1=0;

                var options = {
                    width: 100, //600,
                    height: 240,
                    redFrom: 80,
                    redTo: 100,
                    yellowFrom: 55,
                    yellowTo: 90,
                    greenFrom: 7,
                    greenTo: 55,
                    minorTicks: 5
                };

                ArOptions.push({
                    'id': text,
                    'options': options
                });

                var chart = new google.visualization.Gauge(divstr);
                chart.draw(data, options);

                ArChart.push({
                    'id': text,
                    'chart': chart
                });

                ArPubNub.push({
                    'id': text,
                    'pubnub': pubnub,
                    'uuid': uuid
                });
            }

        } else {
            var foundIndex = ArData.findIndex(x => x.id == text);
            console.log("dans le else");
         //   ArPubNub[foundIndex].pubnub.publish({
         //       channel: "pubnub_onboarding_channel",
         //       message: {
         //           "sender": ArPubNub[foundIndex].uuid,
         //           "content": value
         //       }
         //   }, function(status, response) {
         //       console.log(status);
         //       console.log(response);
         //   });
            console.log("1)Value:");
            console.log(value);
            console.log("1.");
            console.log("1a."); 
            console.log("2a.");
                                    ArData[foundIndex].data.setValue(0, 1, parseInt(value));
/*        setInterval(function() {
            data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
            chart.draw(ArData[foundIndex].data, ArOptions[foundIndex].options);
        }, 13000);
        setInterval(function() {
            data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
            chart.draw(ArData[foundIndex].data, ArOptions[foundIndex].options);
        }, 5000);
        setInterval(function() {
            data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
            chart.draw(ArData[foundIndex].data, ArOptions[foundIndex].options);
        }, 26000);
        console.log("2c.");
  */          
        ArChart[foundIndex].chart.draw(ArData[foundIndex].data, ArOptions[foundIndex].options);
        console.log("3.");
        }
    };

    function Draw(Ar, firsttime) {
        for (var i = 0; i < Ar.length; i++) {
            GoogleChart(Ar[i].div, Ar[i].id, 0, firsttime);
        }
    };

    class Box extends HTMLElement {
        constructor() {
            console.log("constructor");
            super();
            shadowRoot = this.attachShadow({
                mode: "open"
            });

            shadowRoot.appendChild(googleloaderjs);
            shadowRoot.appendChild(template.content.cloneNode(true));

            this._firstConnection = 0;

            this.addEventListener("click", event => {
                console.log('click');
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });
            this._props = {};
        }

        connectedCallback() {
            console.log("connectedCallback");
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            console.log("onCustomWidgetBeforeUpdate");
            this._props = {
                ...this._props,
                ...changedProperties
            };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            console.log("onCustomWidgetAfterUpdate");
            console.log(changedProperties);

            if ("value" in changedProperties) {
                console.log("value:" + changedProperties["value"]);
                this.$value = changedProperties["value"];
            }

            if ("title" in changedProperties) {
                console.log("title:" + changedProperties["title"]);
                this.$title = changedProperties["title"];
            }

            if ("subtitle" in changedProperties) {
                console.log("subtitle:" + changedProperties["subtitle"]);
                this.$subtitle = changedProperties["subtitle"];
            }

            if ("min" in changedProperties) {
                console.log("min:" + changedProperties["min"]);
                this.$min = changedProperties["min"];
            }

            if ("max" in changedProperties) {
                console.log("max:" + changedProperties["max"]);
                this.$max = changedProperties["max"];
            }

            var that = this;

            if (this._firstConnection === 0) {
                const div = document.createElement('div');
                let divid = changedProperties.widgetName;
                this._tagContainer = divid;
                div.innerHTML = '<div id="chart_div' + divid + '"></div>';
                shadowRoot.appendChild(div);


                var mapcanvas_divstr = shadowRoot.getElementById('chart_div' + divid);
                console.log(mapcanvas_divstr);
                this._divid = mapcanvas_divstr;

                Ar.push({
                    'id': divid,
                    'div': mapcanvas_divstr,
                    'value': 88, //this.$value,
                    'title': "essai1", //this.$title,
                    'subtitle': "essai2", //this.$subtitle,
                    'min': this.$min,
                    'max': this.$max
                });

                loadScript(pubnubjs, function() {
                    console.log("Load:" + pubnubjs);

                    loadScript(gaugejs, function() {
                        console.log("Load:" + gaugejs);
                        Draw(Ar, that._firstConnection);
                        that._firstConnection = 1;
                    });
                });

            } else {
                var id = this.$value.split("|")[0];
                console.log("id: " + id);

                var value = this.$value.split("|")[1];
                console.log("value:" + value);

                var title = this.$title;
                console.log("title: " + title);

                var subtitle = this.$subtitle;
                console.log("subtitle: " + subtitle);

                var min = this.$min;
                console.log("min: " + min);

                var max = this.$max;
                console.log("max: " + max);


                if (value !== "") {
                    var foundIndex = Ar.findIndex(x => x.id == id);
                    console.log("foundIndex: " + foundIndex);

                    if (foundIndex !== -1) {
                        drawChart(Ar[foundIndex].div, id, parseInt(value), this._firstConnection);
                    }
                }
            }
        }
    }

    customElements.define("com-fd-sacgauge", Box);
})();