import { Router } from 'express';
import userRoutes from './users.routes.js';
// import productRoutes from './products.routes.js';
import { adminAuth } from '../../middlewares/adminAuth.middleware.js';

const router = Router();


router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Admin API',
    available_routes: [
      'GET    /api/admin/users',
      'GET    /api/admin/users/:id',
      'POST   /api/admin/users',
      'PUT    /api/admin/users/:id',
      'DELETE /api/admin/users/:id',
      'PATCH  /api/admin/users/:id/toggle-status',
      'PATCH  /api/admin/users/:id/password'
    ]
  });
});

router.use(adminAuth);
router.use('/users', userRoutes);
// router.use('/products', productRoutes);

export default router;