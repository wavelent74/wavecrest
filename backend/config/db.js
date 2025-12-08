
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://user:pass@host:5432/db',
});
module.exports = { query: (text, params) => pool.query(text, params) };