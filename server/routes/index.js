import { Router } from 'express';
import adminRoutes from './admin/index.js';
import clientRoutes from './client/index.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Routes',
    available_routes: {
      admin: {
        base: '/api/admin',
        users: '/api/admin/users',
        products: '/api/admin/products'
      },
      client: {
        base: '/api/client',
        products: '/api/client/products',
        auth: '/api/client/auth'
      }
    }
  });
});

router.use('/admin', adminRoutes);
router.use('/client', clientRoutes);
router.use('/auth', authRoutes);
export default router;