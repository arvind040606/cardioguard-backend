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
  pythonBin: process.env.PYTHON_BIN || null,
};

module.exports = { validateEnv, config };
