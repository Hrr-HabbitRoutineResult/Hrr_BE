import authError from '../errors/auth.error.js';
import { prisma } from '../db.config.js';
import logger from '../logger.js';
const findUserPassword = async email => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new authError.userNotExistError('존재하지 않는 이메일입니다.', { email });
  }
  return user.password;
};

const getUserById = async kakao_id => {
  return await prisma.user.findUnique({
    where: {
      kakao_id: kakao_id,
    },
    select: {
      kakao_id: true,
      account_email: true,
      name: true,
      profile_image: true,
    },
  });
};

const signUp = async (email, name) => {
  return await prisma.user.create({
    data: {
      account_email: email,
      name: name,
    },
  });
};

export default { findUserPassword, getUserById, signUp };
