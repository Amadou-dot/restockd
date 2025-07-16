import mongoose from 'mongoose';
// Global database connection promise
let dbConnectionPromise: Promise<typeof mongoose> | null = null;

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost:27017/shop'
      );
    }
    await dbConnectionPromise;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      (error as Error).message
    );
    throw error;
  }
};
