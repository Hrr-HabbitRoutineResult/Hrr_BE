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
import logger from './logger.js';

dotenv.config();
const app = express();

// 공통 응답 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success, status_code) => res.status(201).json({ resultType: 'SUCCESS', error: null, success });

  res.error = ({ errorCode = 'unknown', reason = null, data = null }) => {
    logger.error(`Error occurred: ${errorCode}, Reason: ${reason}`);
    return res.json({ resultType: 'FAIL', error: { errorCode, reason, data }, success: null });
  };

  next();
});

// 전역 오류 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  logger.error(`Error occurred: ${err.errorCode}, Reason: ${err.reason}`);
  next(err);
});

app.use(morganMiddleware);
app.use(express.json());

// API 라우트 설정
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/challenge', challengeRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/board', boardRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/verification', verificationRoutes);

export default app;
