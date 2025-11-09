import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { corsConfig } from './middlewares/cors.middleware.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(helmet());
app.use(cors(corsConfig));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      admin: '/api/admin',
      client: '/api/client'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api', routes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.use(errorHandler);

export default app;