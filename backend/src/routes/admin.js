const express = require('express');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', adminAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard endpoint - To be implemented',
  });
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', adminAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Get all users endpoint - To be implemented',
  });
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private (Admin only)
router.get('/orders', adminAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Get all orders endpoint - To be implemented',
  });
});

module.exports = router;
