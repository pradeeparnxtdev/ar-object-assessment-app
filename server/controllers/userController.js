const pool = require('../config/db');

const createUser = async (req, res) => {
  const { name, username, role, password } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (name, username, role, password) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, username, role, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser }