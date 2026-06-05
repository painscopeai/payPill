import { Request, Response, NextFunction } from 'express';
import { validationResult, body, param, query } from 'express-validator';
import { IApiResponse } from '@/types';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const response: IApiResponse = {
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err: any) => ({
        field: err.path,
        message: err.msg,
      })),
    };
    res.status(400).json(response);
    return;
  }
  
  next();
};

// Auth Validations
export const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name must be less than 50 characters'),
  handleValidationErrors,
];

export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors,
];

// Appointment Validations
export const createAppointmentValidation = [
  body('providerId')
    .isMongoId()
    .withMessage('Valid provider ID is required'),
  body('date')
    .isISO8601()
    .withMessage('Valid date is required'),
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Valid time is required (HH:MM format)'),
  body('type')
    .isIn(['in-person', 'telehealth'])
    .withMessage('Type must be either in-person or telehealth'),
  body('reason')
    .trim()
    .notEmpty()
    .withMessage('Reason for appointment is required')
    .isLength({ max: 500 })
    .withMessage('Reason must be less than 500 characters'),
  handleValidationErrors,
];

// Health Profile Validations
export const updateHealthProfileValidation = [
  body('conditions')
    .optional()
    .isArray()
    .withMessage('Conditions must be an array'),
  body('medications')
    .optional()
    .isArray()
    .withMessage('Medications must be an array'),
  body('allergies')
    .optional()
    .isArray()
    .withMessage('Allergies must be an array'),
  handleValidationErrors,
];

// Pagination Validations
export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isString()
    .withMessage('SortBy must be a string'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('SortOrder must be either asc or desc'),
  handleValidationErrors,
];

// Provider Search Validations
export const providerSearchValidation = [
  query('specialty')
    .optional()
    .isString()
    .withMessage('Specialty must be a string'),
  query('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
  query('search')
    .optional()
    .isString()
    .withMessage('Search must be a string'),
  ...paginationValidation,
];

// Message Validations
export const sendMessageValidation = [
  body('recipientId')
    .isMongoId()
    .withMessage('Valid recipient ID is required'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 200 })
    .withMessage('Subject must be less than 200 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 5000 })
    .withMessage('Content must be less than 5000 characters'),
  handleValidationErrors,
];

// Refill Request Validations
export const refillRequestValidation = [
  body('medicationId')
    .notEmpty()
    .withMessage('Medication ID is required'),
  body('pharmacyId')
    .isMongoId()
    .withMessage('Valid pharmacy ID is required'),
  handleValidationErrors,
];
