const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hulu',
  password: 'tintin',
  port: 5432,
});

module.exports = pool;