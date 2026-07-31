const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { AppError } = require('../middleware/errorMiddleware');
const { runPrediction } = require('../services/predictionService');
const { generateRecommendations } = require('../services/recommendationService');
const { validatePredictionInput } = require('../validators/inputValidator');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const validation = validatePredictionInput(req.body);
    if (validation.error) throw new AppError(validation.error, 400);

    const { patientName, patientId, vitals } = validation.data;
    const result = await runPrediction(vitals);

    const recommendations = generateRecommendations(vitals, result.probability, result.risk_level);

    res.json({
      id: `pred_${Date.now()}`,
      ...result,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user.id };
    const list = await db.Prediction.find(filter);
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const createdBy = req.user.role === 'admin' ? null : req.user.id;

    const result = await db.Prediction.deleteOne({ id, createdBy });
    if (result.deletedCount === 0) {
      throw new AppError('Record not found or you are not authorized to delete it.', 404);
    }

    res.json({ success: true, message: 'Prediction record deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
