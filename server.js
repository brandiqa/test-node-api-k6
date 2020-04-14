// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const promClient = require('prom-client');

const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

const Histogram = promClient.Histogram;
const h = new Histogram({
  name: 'test_histogram',
  help: 'Example of a histogram',
  labelNames: ['code'],
});

const Counter = promClient.Counter;
const c = new Counter({
  name: 'test_counter',
  help: 'Example of a counter',
  labelNames: ['code'],
});

const Gauge = promClient.Gauge;
const g = new Gauge({
  name: 'test_gauge',
  help: 'Example of a gauge',
  labelNames: ['method', 'code'],
});

setTimeout(() => {
  h.labels('200').observe(Math.random());
  h.labels('300').observe(Math.random());
}, 10);

setInterval(() => {
  c.inc({ code: 200 });
}, 5000);

setInterval(() => {
  c.inc({ code: 400 });
}, 2000);

setInterval(() => {
  c.inc();
}, 2000);

setInterval(() => {
  g.set({ method: 'get', code: 200 }, Math.random());
  g.set(Math.random());
  g.labels('post', '300').inc();
}, 100);

// Generate some garbage
// const t = [];
// setInterval(() => {
//   for (let i = 0; i < 100; i++) {
//     t.push(new Date());
//   }
// }, 10);
// setInterval(() => {
//   while (t.length > 0) {
//     t.pop();
//   }
// });

server.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});

server.get('/metrics/counter', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.getSingleMetricAsString('test_counter'));
});

// Enable collection of default metrics
promClient.collectDefaultMetrics({
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
