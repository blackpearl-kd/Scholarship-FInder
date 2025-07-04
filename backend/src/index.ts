import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import scholarshipRoutes from './routes/scholarshipRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import { scheduleCleanup } from './tasks/cleanupExpiredScholarships';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://test:test12345678!!@cluster0.ywto1wl.mongodb.net/scholarship_db';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.once('open', async () => {
      if (mongoose.connection.db) {
        console.log('Database:', mongoose.connection.db.databaseName);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        // Start the scheduled cleanup task after database connection is established
        scheduleCleanup();
      }
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/user-profile', userProfileRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 