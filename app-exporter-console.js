'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || '8080';

const { countAllRequests } = require("./monitoring-exporter-console");
app.use(countAllRequests());

app.get('/', (req, res, next) => {
  res.send("main page");
  next();
});

app.get('/count-url-a', (req, res, next) => {
  res.send("count-url-a");
  next();
});

app.get('/count-url-b', (req, res, next) => {
  res.send("count-url-b");
  next();
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
