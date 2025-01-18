const pool = require('../config/db');

exports.storeVisit = async (req, res) => {
  const { object_id, user_id } = req.body;
  const count = 1;

  
  try {
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.error('Database connection failed:', err);
      } else {
        console.log('Database connected:', res.rows[0]);
      }
    });
    
    const objectResult = await pool.query('SELECT * FROM objects WHERE id = $1', [object_id]);
    if (objectResult.rows.length === 0) {
      return res.status(404).json({ message: 'Object not found' });
    }

    const visitResult = await pool.query(
      'SELECT * FROM visits WHERE user_id = $1 AND object_id = $2',
      [user_id, object_id]
    );

    if (visitResult.rows.length > 0) {
      await pool.query(
        'UPDATE visits SET count = count + $1, updated_at = current_timestamp WHERE user_id = $2 AND object_id = $3',
        [count, user_id, object_id]
      );
    } else {
      // Insert new visit record with the current timestamp for created_at and updated_at
      await pool.query(
        'INSERT INTO visits (user_id, object_id, count, created_at, updated_at) VALUES ($1, $2, $3, current_timestamp, current_timestamp)',
        [user_id, object_id, count]
      );
    }

    res.json({ message: 'Visit recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};