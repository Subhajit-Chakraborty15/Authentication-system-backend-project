const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  next();
};

// Middleware to check admin role
const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  if (user.role !== 'admin') {
    return res.status(403).send('Forbidden');
  }
  next();
};

// Protected route accessible only to authenticated users
router.get('/user', isAuthenticated, (req, res) => {
  res.send('Hello, authenticated user');
});

// Protected route accessible only to admin users
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.send('Hello, admin user');
});

module.exports = router;
