import { StatusCodes } from 'http-status-codes';
import { uploadToS3 } from '../utils/s3Uploader.js';

const uploadImg = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: '파일이 필요합니다.' });
    }
    // S3 업로드
    const photo_url = await uploadToS3(req.file);
    return res.success({ photoUrl: photo_url }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

export default {
  uploadImg,
};
