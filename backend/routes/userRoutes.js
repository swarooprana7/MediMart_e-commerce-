import express from 'express';
import { body, param } from 'express-validator';
import {
  admins,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  resetPasswordRequest,
  updateUser,
  updateUserProfile
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validator.js';
import User from '../models/userModel.js';
const router = express.Router();

import csurf from 'csurf';
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3,
  message: 'Too many login attempts. Please try again later.',
  handler: (req, res, next, options) => {
    User.findOneAndUpdate({ email: req.body.email }, { $set: { isLocked: true } }).then(() => {
      res.status(options.statusCode).json({ message: options.message });
    });
  }
});

// Debugging: Log incoming requests and CSRF token
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Cookies:', req.cookies); // Log cookies to ensure CSRF token is being stored correctly
  console.log('CSRF Token from header:', req.headers['x-csrf-token']); // Log the CSRF token from headers
  next();
});

// CSRF Protection middleware
const csrfProtection = csurf({ cookie: true });

router.get('/get-csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const validator = {
  checkLogin: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('password').trim().isString().notEmpty().withMessage('Password is Empty')
  ],
  checkNewUser: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('password').trim().isString().notEmpty().withMessage('Password is Empty').bail()
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/).withMessage('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('name').trim().notEmpty().withMessage('Name is Required').escape()
  ],
  checkGetUserById: [
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id')
  ],
  checkUpdateUser: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('name').trim().notEmpty().withMessage('Name is Required').escape(),
    body('isAdmin').isBoolean().withMessage('isAdmin value should be true/false'),
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id')
  ],
  resetPasswordRequest: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address")
  ],
  resetPassword: [
    body('password').trim().notEmpty().withMessage('Password is Required').escape().bail()
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/).withMessage('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id'),
    param('token').trim().notEmpty().withMessage('Token is Required')
  ]
}

router.route('/')
  .post(validator.checkNewUser, csrfProtection, validateRequest, registerUser)
  .get(protect, admin, getUsers);

router.route('/admins').get(protect, admin, admins);

router.post('/reset-password/request', validator.resetPasswordRequest, validateRequest, resetPasswordRequest);
router.post('/reset-password/reset/:id/:token', validator.resetPassword, validateRequest, resetPassword);
router.post('/login', loginLimiter, validator.checkLogin, csrfProtection, validateRequest, loginUser);
router.post('/logout', protect, logoutUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(validator.checkNewUser, validateRequest, protect, updateUserProfile);

router
  .route('/:id')
  .get(validator.checkGetUserById, validateRequest, protect, admin, getUserById)
  .put(validator.checkUpdateUser, validateRequest, protect, admin, updateUser)
  .delete(validator.checkGetUserById, validateRequest, protect, admin, deleteUser);

export default router;
