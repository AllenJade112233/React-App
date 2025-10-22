const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/orders - Add a new order
router.post('/orders', (req, res) => {
  const { items, total } = req.body;
  if (!items || !total) {
    return res.status(400).json({ error: 'Items and total are required' });
  }

  // Insert order into orders table
  const orderQuery = 'INSERT INTO orders (total) VALUES (?)';
  db.query(orderQuery, [total], (err, result) => {
    if (err) {
      console.error('Error inserting order:', err);
      res.status(500).json({ error: 'Failed to create order' });
      return;
    }
    const orderId = result.insertId;

    // Insert order items into order_items table (assuming you have this table)
    const itemQueries = items.map(item => {
      return new Promise((resolve, reject) => {
        const itemQuery = 'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (?, ?, ?)';
        db.query(itemQuery, [orderId, item.id, 1], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });

    Promise.all(itemQueries)
      .then(() => res.json({ message: 'Order placed successfully', orderId }))
      .catch(err => {
        console.error('Error inserting order items:', err);
        res.status(500).json({ error: 'Failed to add order items' });
      });
  });
});

module.exports = router;
