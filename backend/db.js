const mongoose = require('mongoose');
const jsonDb = require('./jsonDb');
const { config } = require('./config/env');
const logger = require('./utils/logger');

let isMongoConnected = false;

const PredictionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  input: { type: Object, required: true },
  prediction: { type: Number, required: true },
  probability: { type: Number, required: true },
  riskLevel: { type: String, required: true },
  confidence: { type: Number, required: true },
  explanation: [{ feature: String, impact: Number }],
  recommendations: [String],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

let PredictionModel;

try {
  PredictionModel = mongoose.model('Prediction', PredictionSchema);
} catch {
  PredictionModel = mongoose.model('Prediction');
}

mongoose.connect(config.mongodbUri)
  .then(() => {
    logger.info('Connected to MongoDB successfully.');
    isMongoConnected = true;
  })
  .catch((err) => {
    logger.warn(`MongoDB connection failed (${err.message}). Falling back to JSON file storage.`);
    isMongoConnected = false;
  });

const db = {
  isConnected() {
    return isMongoConnected;
  },

  Prediction: {
    async find(filter = {}) {
      if (isMongoConnected) {
        return PredictionModel.find(filter).sort({ createdAt: -1 }).lean();
      }
      return jsonDb.predictions.find(filter);
    },
    async findById(id) {
      if (isMongoConnected) return PredictionModel.findById(id).lean();
      return jsonDb.predictions.findById(id);
    },
    async create(predData) {
      if (isMongoConnected) {
        const doc = new PredictionModel(predData);
        const saved = await doc.save();
        return saved.toObject();
      }
      return jsonDb.predictions.create(predData);
    },
    async deleteOne({ id, createdBy }) {
      if (isMongoConnected) {
        const filter = { _id: id };
        if (createdBy) filter.createdBy = createdBy;
        const res = await PredictionModel.deleteOne(filter);
        return { deletedCount: res.deletedCount };
      }
      return jsonDb.predictions.deleteOne({ id, createdBy });
    },
  },

};

module.exports = db;
