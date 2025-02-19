import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import logger from '../logger.js';
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async file => {
  const file_name = `uploads/${Date.now()}-${file.originalname}`;
  const upload_params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file_name,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const upload = new Upload({
      client: s3,
      params: upload_params,
    });

    upload.on('httpUploadProgress', progress => {
      logger.debug('📤 Upload Progress:', progress);
    });

    const result = await upload.done();
    logger.debug('✅ S3 업로드 성공:', result);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file_name}`;
  } catch (error) {
    logger.error('❌ S3 업로드 실패:', error);
    throw new Error('파일 업로드 실패');
  }
};

export default uploadToS3;
