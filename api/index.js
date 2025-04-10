import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import generateblogRoute from './routes/generateblog.js'; // should be a function that accepts openai
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { OpenAI } from 'openai';

dotenv.config(); // ✅ Load environment variables

// ✅ Debug check: Make sure your API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is missing from .env');
  process.exit(1); // Stop the server if the key is missing
}

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is missing from .env');
  process.exit(1); // Stop the server if the URI is missing
}

// ✅ Create OpenAI instance with your API keys
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const __dirname = path.resolve();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/generate-blog', generateblogRoute(openai)); // 💡 Pass `openai` here
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ✅ Start server
app.listen(3003, () => {
  console.log('🚀 Server running on http://localhost:3003');
});
