const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { validateEnv, config } = require('./config/env');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const statsRoutes = require('./routes/statsRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

validateEnv();

const app = express();

app.use(helmet());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CardioGuard AI API',
    database: db.isConnected() ? 'MongoDB' : 'JSON File Fallback',
    environment: config.nodeEnv,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/predict', predictionRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/users', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`CardioGuard API running on http://localhost:${config.port}`);
});

module.exports = app;
