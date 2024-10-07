
const express = require('express');
const router = express.Router();
const pool = require("../config/db");

router.get('/api/buyers/:id', async (req, res) => {
  const buyerId = req.params.id;

  try {
    const { rows } = await pool.query('SELECT * FROM Buyers WHERE Buyer_ID = $1', [buyerId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Buyer not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching buyer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch transactions by buyer ID
router.get('/api/transactions', async (req, res) => {
  const buyerId = req.query.buyer_id;

  try {
    const { rows } = await pool.query('SELECT * FROM Transactions WHERE Buyer_ID = $1', [buyerId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});