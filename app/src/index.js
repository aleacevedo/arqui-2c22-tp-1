const express = require('express');
const axios = require('axios');
const app = express();
const {DateTime} = require('luxon');
var StatsD = require('node-statsd'),
      client = new StatsD();

app.get('/ping', async (req, res) => {
  const start = DateTime.now();
  res.send('pong');
  const end = DateTime.now();
  const responseTime = end - start;
  client.timing('response_time', responseTime);
});

// la idea era probar diferentes locations de ngnix y ver que esté todo funcionando bien. Esto es temporal.
app.get('/bbox/a', async (req, res) => {
  const start = DateTime.now();
  try{
    const response = await axios.get('http://bbox:9090');
    res.status(200).send(response.data);
  }catch(err){
    res.status(500).send(err)
  }
  const end = DateTime.now();
  const responseTime = end - start;
  client.timing('response_time', responseTime);
});

// la idea era probar diferentes locations de ngnix y ver que esté todo funcionando bien. Esto es temporal.
app.get('/bbox/b', async (req, res) => {
  const start = DateTime.now();
  try{
    const response = await axios.get('http://bbox:9091')
    res.status(200).send(response.data)
  }catch(err){
    res.status(500).send('Error no identificado')
  }
  const end = DateTime.now();
  const responseTime = end - start;
  client.timing('response_time', responseTime);
});

app.listen(3000, () => {
  console.log('Service started on port 3000!');
});
