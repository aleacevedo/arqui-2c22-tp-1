require('dotenv').config()
const express = require('express');
const axios = require('axios');
const app = express();
const apiRouter = require('./routers');

app.get('/ping', (req, res) => {
  console.log('ping');
  res.send('pong');
});

// la idea era probar diferentes locations de ngnix y ver que esté todo funcionando bien. Esto es temporal.
app.get('/bbox/a', (req, res) => {
  return axios.get('http://2c22-tp-1-nginx-1/bbox/a/')
    .then(({ data }) => res.status(200).send(data))
    .catch(err => res.status(500).send(err.message));
});

// la idea era probar diferentes locations de ngnix y ver que esté todo funcionando bien. Esto es temporal.
app.get('/bbox/b', (req, res) => {
  return axios.get('http://2c22-tp-1-nginx-1/bbox/b/')
    .then(({ data }) => res.status(200).send(data))
    .catch(err => res.status(500).send(err.message));
});

app.get('/', (req, res) => {
  console.log("New request");
  res.send('Hola World!');
});

app.use(express.json())

app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
