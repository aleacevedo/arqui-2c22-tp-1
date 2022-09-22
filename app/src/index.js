const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// la idea era probar diferentes locations de ngnix y ver que esté todo funcionando bien. Esto es temporal.
app.get('/bbox/x', (req, res) => {
  return axios.get('http://bbox:9090')
    .then(({ data }) => res.status(200).send(data))
    .catch(err => res.status(500).send('Error no identificado'));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
