import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Swagger JSON 파일이 위치한 디렉토리 경로
const swaggerDir = path.join(__dirname, 'swagger'); // swagger 폴더 내의 모든 JSON 파일을 자동으로 로드

// ✅ 루트 Swagger 파일 불러오기 (기본적인 구조 유지)
const rootPath = path.join(swaggerDir, 'swaggerRoot.json');
const root = JSON.parse(fs.readFileSync(rootPath, 'utf8'));

// ✅ swagger 폴더에서 모든 JSON 파일 불러오기 (swaggerRoot.json 제외)
const swaggerFiles = fs.readdirSync(swaggerDir).filter(file => file.endsWith('.json') && file !== 'swaggerRoot.json');

/**
 * ✅ 같은 엔드포인트(`/api/v1/users/me`)가 존재할 경우,
 * ✅ 기존 HTTP 메서드(`GET`, `PUT`, `POST` 등)는 유지하면서 추가하는 방식
 */
const mergePaths = (targetPaths, sourcePaths) => {
  Object.keys(sourcePaths).forEach(endpoint => {
    if (!targetPaths[endpoint]) {
      targetPaths[endpoint] = sourcePaths[endpoint];
    } else {
      Object.keys(sourcePaths[endpoint]).forEach(method => {
        if (!targetPaths[endpoint][method]) {
          targetPaths[endpoint][method] = sourcePaths[endpoint][method];
        } else {
          console.warn(`⚠️ 중복된 HTTP 메서드 발견: ${method.toUpperCase()} ${endpoint}, 기존 데이터를 유지합니다.`);
        }
      });
    }
  });
};

// ✅ 모든 JSON 파일 병합
swaggerFiles.forEach(file => {
  const filePath = path.join(swaggerDir, file);
  console.log(`🔄 병합 중: ${filePath}`);
  console.log(filePath);
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // ✅ paths 병합
  mergePaths(root.paths, jsonData.paths);

  // ✅ components.schemas 병합
  root.components.schemas = {
    ...root.components.schemas,
    ...jsonData.components?.schemas,
  };
});

// ✅ Bearer 인증 방식 추가 (자동으로 포함)
if (!root.components.securitySchemes) {
  root.components.securitySchemes = {};
}
root.components.securitySchemes.bearerAuth = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
};

// ✅ 병합된 JSON 저장
const outputPath = path.join(__dirname, 'swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(root, null, 2));

console.log('✅ Swagger JSON 파일이 성공적으로 병합되었습니다!');
