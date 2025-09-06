const express = require('express');
const { body } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
  cancelOrder,
} = require('../controllers/orderController');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post(
  '/',
  auth,
  [
    body('shippingAddress.fullName').notEmpty().withMessage('Full name is required'),
    body('shippingAddress.address').notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
    body('paymentMethod').isIn(['stripe', 'razorpay', 'paypal']).withMessage('Invalid payment method'),
  ],
  createOrder
);

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, getMyOrders);

// @route   GET /api/orders/admin
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/admin', auth, adminAuth, getAllOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, getOrderById);

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', auth, updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered (Admin only)
// @access  Private/Admin
router.put('/:id/deliver', auth, adminAuth, updateOrderToDelivered);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel', auth, cancelOrder);

module.exports = router;
