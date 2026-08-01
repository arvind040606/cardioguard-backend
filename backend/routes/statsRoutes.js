const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');
const { buildPredictionFilter, computeStats } = require('../services/statsService');
const { getBenchmarkData } = require('../services/benchmarkService');

const router = express.Router();

// Public route: Benchmark Dataset Analytics computed from real Cleveland heart.csv & ML model artifacts
router.get('/benchmark', async (_req, res, next) => {
  try {
    const data = await getBenchmarkData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Public route: Aggregated Live User Analytics from actual platform usage (anonymized)
router.get('/public-live', async (_req, res, next) => {
  try {
    const predictions = await db.Prediction.find({});
    const users = await db.User.find();
    res.json(computeStats(predictions, users ? users.length : 0));
  } catch (error) {
    next(error);
  }
});

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
