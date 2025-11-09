import app from './app.js';
import { connectDatabase } from './config/database.js';
import { PORT, NODE_ENV } from './config/environment.js';

const startServer = async () => {
  try {
   
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log('\n🚀 ========================================');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🚀 Environment: ${NODE_ENV}`);
      console.log('🚀 ========================================');
      console.log(`📱 Root:       http://localhost:${PORT}`);
      console.log(`🏥 Health:     http://localhost:${PORT}/health`);
      console.log(`🔐 Admin API:  http://localhost:${PORT}/api/admin`);
      console.log(`🌐 Client API: http://localhost:${PORT}/api/client`);
      console.log('🚀 ========================================\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

startServer();