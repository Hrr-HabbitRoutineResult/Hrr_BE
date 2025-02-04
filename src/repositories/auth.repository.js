import authError from '../errors/auth.error.js';
import { prisma } from '../db.config.js';
import logger from '../logger.js';
const findUserPassword = async email => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new authError.UserNotExistError('존재하지 않는 이메일입니다.', { email });
  }
  return user.password;
};

const getUserByKakaoId = async kakao_id => {
  try {
    return await prisma.user.findUnique({
      where: {
        kakao_id: kakao_id,
      },
      select: {
        kakao_id: true,
        account_email: true,
      },
    });
  } catch (error) {
    throw new databaseError.DataBaseError('DataBase Error on login kakao');
  }
};

export default { findUserPassword, getUserByKakaoId };
