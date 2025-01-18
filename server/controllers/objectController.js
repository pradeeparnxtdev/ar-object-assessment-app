const { pool } = require('../config/db');

// Create object
exports.createObject = async (req, res) => {
  const { name, url } = req.body;

  try {
    await pool.query('INSERT INTO objects (name, url) VALUES ($1, $2)', [name, url]);
    res.status(201).json({ message: 'Object created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};