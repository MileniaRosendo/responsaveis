const { Pool } = require('pg');

const pool = new Pool({
  user:'tobykvlw',
  host:'isabelle.db.elephantsql.com',
  database:'tobykvlw',
  password:'Ct6Tx3QDKFlmOcI12cenq3TceejxdvYc',
  port:5432, // Porta padrão do PostgreSQL
});

module.exports = pool;