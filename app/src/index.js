require('dotenv').config()
const express = require('express');
const axios = require('axios');
const app = express();
const apiRouter = require('./routers');
const { DateTime } = require('luxon');

const lynx = require('lynx');
var opt = {};
opt.prefix = 'arqly';
const metrics = new lynx('2c22-tp-1_graphite_1', 8125, opt);
const TIMEOUT = 1000;

const startTimeToSaveMetric = () => {
  return DateTime.now();
}

const sendMetric = (start) => {
  const end = DateTime.now();
  const responseTime = end - start;
  metrics.timing('TimerApp.mwi', responseTime);
}

app.get('/ping', async (req, res) => {
  const start = startTimeToSaveMetric();

  sendMetric(start);
  res.send('pong');
});

app.get('/bbox/a', async (req, res) => {
  const start = startTimeToSaveMetric();
  try {
    const response = await axios.get('http://bbox:9090');
    sendMetric(start);
    res.status(200).send(response.data);
  } catch (err) {
    sendMetric(start);
    res.status(500).send(err)
  }
});

app.get('/bbox/b', async (req, res) => {
  const start = startTimeToSaveMetric();
  return axios.get('http://bbox:9091')
    .then(() => {
      sendMetric(start);
      res.status(200).send(response.data);
    })
    .catch(() => {
      sendMetric(start);
      res.status(500).send('Error no identificado');
    });
});

app.get('/heavy', (req, res) => {
  const start = startTimeToSaveMetric();
  for (var t = new Date(); new Date() - t < TIMEOUT;) { }
  sendMetric(start);
  res.status(200).send('heavy');
});

app.use(express.json())

app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Service started on port 3000!');
});
