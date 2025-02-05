import dotenv from 'dotenv';
import logger from './logger.js';
import app from './app.js';
import cronjobs from './utils/cronjobs.util.js';
import swaggerUiExpress from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const port = process.env.PORT;

// 현재 파일의 경로 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger JSON 불러오기
const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

// Swagger UI 설정
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

// 공통 응답 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = success => res.json({ resultType: 'SUCCESS', error: null, success });

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

// 기본 엔드포인트
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 서버 실행
app.listen(port, () => {
  logger.info(`🚀 Server listening on port ${port}`);
  cronjobs.startCronJobs();
});
