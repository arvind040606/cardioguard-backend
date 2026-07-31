const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');
const { buildPredictionFilter, computeStats } = require('../services/statsService');

const router = express.Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const filter = buildPredictionFilter(req.user);
    const predictions = await db.Prediction.find(filter);

    let userCount = 1;
    if (req.user.role === 'admin') {
      const users = await db.User.find();
      userCount = users.length;
    }

    res.json(computeStats(predictions, userCount));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
