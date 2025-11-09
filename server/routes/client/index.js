import { Router } from 'express';
// import productRoutes from './products.routes.js';
// import authRoutes from './auth.routes.js';

const router = Router();


router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Client API',
    available_routes: [
      'POST /api/client/auth/login',
      'POST /api/client/auth/register',
      'GET  /api/client/products'
    ]
  });
});

// router.use('/products', productRoutes);
// router.use('/auth', authRoutes);

export default router;