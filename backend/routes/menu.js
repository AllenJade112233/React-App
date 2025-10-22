const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/menu - Fetch all menu items
router.get('/menu', (req, res) => {
  const query = 'SELECT * FROM menu_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      res.status(500).json({ error: 'Failed to fetch menu items' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
