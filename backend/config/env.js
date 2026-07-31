require('dotenv').config();

const REQUIRED_VARS = []; // Removed strict requirements since Supabase handles Auth and DB

function validateEnv() {
  // Pass through without crashing
}

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  mongodbUri: process.env.MONGODB_URI || '',
  frontendUrl: process.env.FRONTEND_URL || '*',
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  },
  resetTokenExpiryMs: 60 * 60 * 1000,
  pythonBin: process.env.PYTHON_BIN || null,
};

module.exports = { validateEnv, config };
