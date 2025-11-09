import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Erwinlero:Erwinlero-db@clustersimplify.sc7q3ny.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSimplify';
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const JWT_SECRET = process.env.JWT_SECRET || '9f3b6a2d1c4e7a8b0f2e4d6c8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '1f4d8e9c2b7a0f3e5d6c9a8b1e2f3d4c6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6';
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export const COOKIE_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000;