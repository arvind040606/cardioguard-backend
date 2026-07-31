require('dotenv').config();

const REQUIRED_VARS = [
  'JWT_SECRET',
  'MONGODB_URI',
  'SESSION_SECRET',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
  'EMAIL_FROM',
];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) {
    console.error('Fatal: Missing required environment variables:');
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error('\nCopy .env.example to .env and configure all required values before starting the server.');
    process.exit(1);
  }

  if (process.env.JWT_SECRET.length < 32) {
    console.error('Fatal: JWT_SECRET must be at least 32 characters.');
    process.exit(1);
  }

  if (process.env.SESSION_SECRET.length < 32) {
    console.error('Fatal: SESSION_SECRET must be at least 32 characters.');
    process.exit(1);
  }
}

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  mongodbUri: process.env.MONGODB_URI,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
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
