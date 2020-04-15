// server.js
const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults()

// Collect metrics
const prometheusExporter = require('@tailorbrands/node-exporter-prometheus');
const options = {
  appName: "crocodile-api",
  collectDefaultMetrics: true,
  ignoredRoutes: ['/metrics', '/favicon.ico', '/__rules']
};
const promExporter = prometheusExporter(options);
app.use(promExporter.middleware);
app.get('/metrics', promExporter.metrics);

app.use(middlewares);
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `JSON server listening on 127.0.0.1:${port}`,
  );
});
