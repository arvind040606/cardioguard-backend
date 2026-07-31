const nodemailer = require('nodemailer');
const { config } = require('../config/env');
const logger = require('../utils/logger');
const { AppError } = require('../middleware/errorMiddleware');

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }
  return transporter;
}

async function sendPasswordResetEmail(to, resetUrl) {
  try {
    await getTransporter().sendMail({
      from: config.email.from,
      to,
      subject: 'CardioGuard AI — Password Reset Request',
      text: [
        'You requested a password reset for your CardioGuard AI account.',
        '',
        `Reset your password using this link (valid for 1 hour):`,
        resetUrl,
        '',
        'If you did not request this, you can safely ignore this email.',
      ].join('\n'),
      html: `
        <p>You requested a password reset for your CardioGuard AI account.</p>
        <p><a href="${resetUrl}">Reset your password</a> (link valid for 1 hour)</p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });
    logger.info('Password reset email sent', { to });
  } catch (error) {
    logger.error('Failed to send password reset email', { message: error.message });
    throw new AppError('Unable to send password reset email. Please contact your administrator.', 503);
  }
}

module.exports = { sendPasswordResetEmail };
