import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import challengeRoutes from './routes/challenge.routes.js';
import messageRoutes from './routes/message.routes.js';
import postRoutes from './routes/post.routes.js';
import boardRoutes from './routes/board.routes.js';
import verificationRoutes from './routes/verification.routes.js';
import morganMiddleware from './middlewares/morganMiddleware.js';
dotenv.config();

const app = express();

app.use(morganMiddleware);
app.use(express.json());

// Auth Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/challenge', challengeRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/board', boardRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/verification', verificationRoutes);

export default app;
