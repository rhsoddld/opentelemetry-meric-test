'use strict';

const { MeterProvider } = require('@opentelemetry/metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// PrometheusExporter Preparation
// const prometheusPort = PrometheusExporter.DEFAULT_OPTIONS.port          // port: 9464
// const prometheusEndPoint = PrometheusExporter.DEFAULT_OPTIONS.endpoint  // url: /metrics
// const exporter = new PrometheusExporter(
//     { 
//         startServer: true,
//     },
//     () => {
//         console.log(
//             `prometheus scrape endpoint: http://localhost:${prometheusPort}${prometheusEndPoint}`,
//         );
//     },
// );

// PrometheusExporter Preparation
const options = {port: 9464, startServer: true};
const exporter = new PrometheusExporter(options);



// Export Set for Meter
const meter = new MeterProvider({
    exporter,
    interval: 1000,
}).getMeter('color-meter');


const colorCount = meter.createCounter('colors', {
    description: 'Count each color'
});

colorCount.add(10, { pid: process.pid });

// Count number 
const redCounter = colorCount.bind({ color: 'red'});
const blueCounter = colorCount.bind({ color: 'blue'});
const yellowCounter = colorCount.bind({ color: 'yellow'});

module.exports.countColorRequests = () => {
  return (req, res, next) => {
    switch (res.locals.color) {
      case 'red':
        console.log("red");
        redCounter.add(1);
        break;
      case 'blue':
        blueCounter.add(1);
        break;
      case 'yellow':
        yellowCounter.add(1);
        break;
    }
    next();
  };
};