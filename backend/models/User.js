const db = require('../config/db');

const createUser = async (name, email, phone, password, role) => {
  const res = await db.query(
    'INSERT INTO users(name, email, phone, password, role) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [name, email, phone, password, role]
  );
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

module.exports = { createUser, findUserByEmail };