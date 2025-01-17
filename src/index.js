import dotenv from 'dotenv';
import logger from './logger.js';
import morganMiddleware from './middlewares/morganMiddleware.js';
import swaggerAutogen from 'swagger-autogen';
import swaggerUiExpress from 'swagger-ui-express';
import app from './app.js';
dotenv.config();

const port = process.env.PORT;

/*****************공통 응답을 사용할 수 있는 헬퍼 함수 등록*********************/
app.use((req, res, next) => {
  res.success = success => {
    return res.json({
      resultType: 'SUCCESS',
      error: null,
      success: success,
    });
  };

  res.error = ({ errorCode = 'unknown', reason = null, data = null }) => {
    logger.error(`Error occurred: ${errorCode}, Reason: ${reason}`);

    return res.json({
      resultType: 'FAIL',
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});
/*****************공통 응답을 사용할 수 있는 헬퍼 함수 등록*********************/

app.use(
  '/docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: '/openapi.json',
      },
    },
  ),
);

app.get('/openapi.json', async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: '3.0.0',
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = '/dev/null'; // 파일 출력은 사용하지 않습니다.
  const routes = ['./src/index.js', './src/app.js'];
  const doc = {
    info: {
      title: 'UMC 7th',
      description: 'UMC 7th Node.js 테스트 프로젝트입니다.',
    },
    host: 'localhost:3000',
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.use(morganMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  logger.info('Server listening on port ' + port);
});
