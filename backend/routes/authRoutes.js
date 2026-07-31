const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { authLimiter, passwordResetLimiter } = require('../middleware/rateLimiter');
const { AppError } = require('../middleware/errorMiddleware');
const { config } = require('../config/env');
const { sendPasswordResetEmail } = require('../services/emailService');
const {
  validateRegistration,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} = require('../validators/inputValidator');
const logger = require('../utils/logger');

const router = express.Router();

function signToken(user) {
  const id = user.id || user._id?.toString();
  return jwt.sign({ id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
}

function sanitizeUser(user) {
  return {
    id: user.id || user._id?.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const validation = validateRegistration(req.body);
    if (validation.error) throw new AppError(validation.error, 400);

    const { name, email, password } = validation.data;
    const existingUser = await db.User.findOne({ email });
    if (existingUser) throw new AppError('An account with this email already exists.', 400);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const allUsers = await db.User.find();
    const role = allUsers.length === 0 ? 'admin' : 'doctor';

    const newUser = await db.User.create({ name, email, password: hashedPassword, role });
    const token = signToken(newUser);

    logger.info('User registered', { userId: newUser.id || newUser._id, role });

    res.status(201).json({ token, user: sanitizeUser(newUser) });
  } catch (error) {
    next(error);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const validation = validateLogin(req.body);
    if (validation.error) throw new AppError(validation.error, 400);

    const { email, password } = validation.data;
    const user = await db.User.findOne({ email });
    if (!user) throw new AppError('Invalid email or password.', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Invalid email or password.', 401);

    const token = signToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await db.User.findById(req.user.id);
    if (!user) throw new AppError('User account not found.', 404);
    res.json(sanitizeUser(user));
  } catch (error) {
    next(error);
  }
});

router.post('/forgot-password', passwordResetLimiter, async (req, res, next) => {
  try {
    const validation = validateForgotPassword(req.body);
    if (validation.error) throw new AppError(validation.error, 400);

    const { email } = validation.data;
    const user = await db.User.findOne({ email });

    // Always return the same message to prevent email enumeration
    const successMessage =
      'If an account exists with that email, a password reset link has been sent.';

    if (!user) {
      logger.info('Password reset requested for unknown email', { email });
      return res.json({ message: successMessage });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + config.resetTokenExpiryMs);

    const userId = user.id || user._id?.toString();
    await db.ResetToken.create({ userId, tokenHash, expiresAt });

    const resetUrl = `${config.frontendUrl}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(email, resetUrl);

    res.json({ message: successMessage });
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', passwordResetLimiter, async (req, res, next) => {
  try {
    const validation = validateResetPassword(req.body);
    if (validation.error) throw new AppError(validation.error, 400);

    const { token, password } = validation.data;
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const resetRecord = await db.ResetToken.findByTokenHash(tokenHash);
    if (!resetRecord || new Date(resetRecord.expiresAt) < new Date()) {
      throw new AppError('Password reset link is invalid or has expired.', 400);
    }

    const user = await db.User.findById(resetRecord.userId);
    if (!user) throw new AppError('User account not found.', 404);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.User.updatePassword(user.email, hashedPassword);
    await db.ResetToken.deleteByUserId(resetRecord.userId);

    logger.info('Password reset completed', { userId: resetRecord.userId });

    res.json({ message: 'Password has been reset successfully. You may now sign in.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
