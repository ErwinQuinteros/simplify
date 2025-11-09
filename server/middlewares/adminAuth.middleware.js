import { auth } from './auth.middleware.js';
import { ApiError } from '../utils/ApiError.js';

export const adminAuth = [
  auth,
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      throw new ApiError(403, 'Access denied. Admin role required.');
    }
    next();
  }
];