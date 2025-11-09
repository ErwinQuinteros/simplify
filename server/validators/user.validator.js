import { body, param, query } from 'express-validator';

export const createUserValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be user or admin'),
  
  body('avatar')
    .optional()
    .isURL().withMessage('Avatar must be a valid URL')
];

export const updateUserValidator = [
  param('id')
    .isMongoId().withMessage('Invalid user ID'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be user or admin'),
  
  body('avatar')
    .optional()
    .isURL().withMessage('Avatar must be a valid URL')
];

export const updatePasswordValidator = [
  param('id')
    .isMongoId().withMessage('Invalid user ID'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const getUserValidator = [
  param('id')
    .isMongoId().withMessage('Invalid user ID')
];

export const getUsersQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1 }).withMessage('Search term cannot be empty'),
  
  query('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be user or admin'),
  
  query('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean')
];