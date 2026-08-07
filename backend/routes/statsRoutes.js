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
    // Users are managed by Supabase, we don't have local user count
    res.json(computeStats(predictions, 0));
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
      // Users are managed by Supabase
      userCount = 0;
    }

    res.json(computeStats(predictions, userCount));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
