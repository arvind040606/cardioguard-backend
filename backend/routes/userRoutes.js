const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/authMiddleware');
const { AppError } = require('../middleware/errorMiddleware');

const router = express.Router();

router.get('/', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const users = await db.User.find();
    const cleanUsers = users.map((u) => ({
      id: u.id || u._id?.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    }));
    res.json(cleanUsers);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, requireAdmin, async (req, res, next) => {
  try {
    const targetId = req.params.id;
    if (targetId === req.user.id) {
      throw new AppError('You cannot delete your own administrator account.', 400);
    }

    const result = await db.User.deleteOne({ id: targetId });
    if (result.deletedCount === 0) {
      throw new AppError('User account not found.', 404);
    }

    res.json({ success: true, message: 'User account deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
