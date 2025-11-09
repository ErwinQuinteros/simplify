import { verifyAccessToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';
import userRepository from '../repositories/UserRepository.js';

export const auth = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'No token provided');
        }

        const token = authHeader.split(' ')[1];


        const decoded = verifyAccessToken(token);

        const user = await userRepository.findById(decoded.userId);

        if (!user || !user.isActive) {
            throw new ApiError(401, 'User not found or inactive');
        }

        req.user = {
            userId: user._id,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(401, 'Invalid or expired token'));
        }
    }
};