const rateLimit = require('express-rate-limit');
const cors = require('cors');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const bruteForceDelay = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = {
  authLimiter,
  bruteForceDelay,
  corsOptions,
};