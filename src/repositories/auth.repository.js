import authError from '../errors/auth.error.js';
import { prisma } from '../db.config.js';
import bcrypt from 'bcrypt';
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

const getUserByEmail = async email => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });
  } catch (error) {
    throw new databaseError.DataBaseError('DataBase Error on login kakao');
  }
};

const signUpKakao = async email => {
  try {
    const dummy_password = await bcrypt.hash('kakao_dummy_password', 10); // 더미 비밀번호 해시화

    const new_user = await prisma.user.create({
      data: {
        email,
        password: dummy_password,
        followerCount: 0,
        followingCount: 0,
        points: 0,
      },
    });
    return new_user;
  } catch (error) {
    throw new databaseError.DataBaseError('DataBase Error on login kakao');
  }
};

export default { findUserPassword, getUserByEmail, signUpKakao };
