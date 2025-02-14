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

// 기본 엔드포인트
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/error/html', (req, res) => {
  // 현재 날짜 가져오기
  const today = new Date().toISOString().split('T')[0];
  const logFilePath = path.join(__dirname, '..', 'logs', `${today}.exception.log`);

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('<h1>해당 날짜의 로그 파일을 찾을 수 없습니다.</h1>');
    }

    res.send(`<pre>${data}</pre>`);
  });
});

// 서버 실행
app.listen(port, () => {
  logger.info(`🚀 Server listening on port ${port}`);
  cronjobs.startCronJobs();
});
