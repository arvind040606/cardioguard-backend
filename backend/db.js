const mongoose = require('mongoose');
const jsonDb = require('./jsonDb');
const { config } = require('./config/env');
const logger = require('./utils/logger');

let isMongoConnected = false;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['doctor', 'admin'], default: 'doctor' },
  createdAt: { type: Date, default: Date.now },
});

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

const ResetTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

let UserModel;
let PredictionModel;
let ResetTokenModel;

try {
  UserModel = mongoose.model('User', UserSchema);
  PredictionModel = mongoose.model('Prediction', PredictionSchema);
  ResetTokenModel = mongoose.model('ResetToken', ResetTokenSchema);
} catch {
  UserModel = mongoose.model('User');
  PredictionModel = mongoose.model('Prediction');
  ResetTokenModel = mongoose.model('ResetToken');
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

  User: {
    async findOne({ email }) {
      if (isMongoConnected) return UserModel.findOne({ email }).lean();
      return jsonDb.users.findOne({ email });
    },
    async findById(id) {
      if (isMongoConnected) return UserModel.findById(id).lean();
      return jsonDb.users.findById(id);
    },
    async create(userData) {
      if (isMongoConnected) {
        const doc = new UserModel(userData);
        const saved = await doc.save();
        return saved.toObject();
      }
      return jsonDb.users.create(userData);
    },
    async updatePassword(email, newHashedPassword) {
      if (isMongoConnected) {
        const res = await UserModel.updateOne({ email }, { password: newHashedPassword });
        return res.modifiedCount > 0;
      }
      return jsonDb.users.updatePassword(email, newHashedPassword);
    },
    async find() {
      if (isMongoConnected) return UserModel.find().lean();
      return jsonDb.users.find();
    },
    async deleteOne({ id }) {
      if (isMongoConnected) {
        const res = await UserModel.deleteOne({ _id: id });
        return { deletedCount: res.deletedCount };
      }
      return jsonDb.users.deleteOne({ id });
    },
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

  ResetToken: {
    async create({ userId, tokenHash, expiresAt }) {
      if (isMongoConnected) {
        await ResetTokenModel.deleteMany({ userId });
        const doc = new ResetTokenModel({ userId, tokenHash, expiresAt });
        const saved = await doc.save();
        return saved.toObject();
      }
      return jsonDb.resetTokens.create({ userId, tokenHash, expiresAt });
    },
    async findByTokenHash(tokenHash) {
      if (isMongoConnected) return ResetTokenModel.findOne({ tokenHash }).lean();
      return jsonDb.resetTokens.findByTokenHash(tokenHash);
    },
    async deleteByUserId(userId) {
      if (isMongoConnected) {
        await ResetTokenModel.deleteMany({ userId });
        return;
      }
      return jsonDb.resetTokens.deleteByUserId(userId);
    },
    async deleteExpired() {
      if (isMongoConnected) {
        await ResetTokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
        return;
      }
      return jsonDb.resetTokens.deleteExpired();
    },
  },
};

module.exports = db;
