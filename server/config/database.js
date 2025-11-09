import mongoose from 'mongoose';
import { MONGODB_URI } from './environment.js';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};