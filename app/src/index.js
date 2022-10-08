const express = require('express');
const axios = require('axios');
const app = express();
const { DateTime } = require('luxon');

const lynx = require('lynx');
var opt = {};
opt.prefix = 'arqly';
const metrics = new lynx('2c22-tp-1_graphite_1', 8125, opt);
const TIMEOUT = 1000;

app.use((req, res, next) => {
  const start = DateTime.now();
  req.custom = { start };
  next();
});

const sendMetric = (req) => {
  const end = DateTime.now();
  const responseTime = end - req.custom.start;
  metrics.timing('TimerApp.mwi', responseTime);
}

app.get('/ping', async (req, res) => {
  sendMetric(req);
  res.send('pong');
});


// la idea era probar diferentes locations de ngnix y ver que esté todo funcionando bien. Esto es temporal.
app.get('/bbox/a', async (req, res) => {
  try {
    const response = await axios.get('http://bbox:9090');
    sendMetric(req);
    res.status(200).send(response.data);
  } catch (err) {
    sendMetric(req);
    res.status(500).send(err)
  }
});

// la idea era probar diferentes locations de ngnix y ver que esté todo funcionando bien. Esto es temporal.
app.get('/bbox/b', async (req, res) => {
  try {
    const response = await axios.get('http://bbox:9091')
    sendMetric(req);
    res.status(200).send(response.data);
  } catch (err) {
    sendMetric(req);
    res.status(500).send('Error no identificado');
  }
});

app.get('/heavy', (req, res) => {
  for (var t = new Date(); new Date() - t < TIMEOUT;) { }
  sendMetric(req);
  res.status(200).send('heavy');
});

app.listen(3000, () => {
  console.log('Service started on port 3000!');
});
