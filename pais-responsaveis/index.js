const express = require('express');
const bodyParser = require('body-parser');
const rotas = require('./routes');
const db = require('./db.js');
const app = express();


async () => {
  await db.connect();
};
app.use(bodyParser.json());
app.use('/', rotas);

app.listen(3000, () => {
  console.log('Servidor executando na porta 3000');
});