import dotenv from 'dotenv';
import logger from './logger.js';
import app from './app.js';
import cronjobs from './utils/cronjobs.util.js';
import swaggerUiExpress from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

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
  const logFilePath = path.join(__dirname, '..', 'logs/error', `${today}.error.log`);

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('<h1>해당 날짜의 로그 파일을 찾을 수 없습니다.</h1>');
    }

    res.send(`<pre>${data}</pre>`);
  });
});

// SSL 인증서 설정
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '../ssl', 'privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../ssl', 'fullchain.pem')),
};

// HTTPS 서버 실행
https.createServer(sslOptions, app).listen(443, () => {
  logger.info(`✅ HTTPS Server listening on port 443`);
});

// HTTP 리다이렉트
http
  .createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  })
  .listen(80, () => {
    logger.info(`🔄 HTTP requests are redirected to HTTPS`);
  });

// 서버 실행 (여기서는 HTTP를 80 포트로 리다이렉트)
app.listen(port, () => {
  logger.info(`🚀 Server listening on port 80`);
  cronjobs.startCronJobs();
});
