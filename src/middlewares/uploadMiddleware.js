import multer from 'multer';

const storage = multer.memoryStorage(); // 메모리 저장 (S3 업로드용)
const upload = multer({ storage });

export default upload;
