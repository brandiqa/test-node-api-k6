// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const promClient = require('prom-client');

const Counter = promClient.Counter;
// create http request counter
const c = new Counter({
  name: 'http_reqs',
  help: 'number of http requests',
});
server.use((req, res, next) => {
  c.inc();  // increment the request counter
  next() // continue to JSON Server router
});

// const collectDefaultMetrics = promClient.collectDefaultMetrics;
// const Registry = promClient.Registry;
// const register = new Registry();
// collectDefaultMetrics({ register });


// server.get('/metrics', (req, res) => {
//   res.set('Content-Type', register.contentType);
//   res.end(register.metrics());
// });

server.use(middlewares);
server.use(router);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(
    `Server listening to http://localhost:${port}, metrics exposed on /metrics endpoint`,
  );
});
