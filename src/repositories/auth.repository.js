import authError from '../errors/auth.error.js';
import { prisma } from '../db.config.js';
import bcrypt from 'bcrypt';
import databaseError from '../errors/database.error.js';
import logger from '../logger.js';

const findUserById = async user_id => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });
    return user;
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('유저 조회중 에러가 발생했습니다.');
  }
};

const findUserByEmail = async email => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('유저 조회중 에러가 발생했습니다.');
  }
};

// 이메일 인증 정보를 조회하는 함수
const findEmailVerification = async email => {
  const email_verification = await prisma.emailVerification.findUnique({
    where: { email },
  });
  return email_verification;
};

// 이메일 인증 정보를 삭제하는 함수
const deleteEmailVerification = async email => {
  try {
    const deleted = await prisma.emailVerification.delete({
      where: { email },
    });
    return deleted; // 삭제된 항목 반환
  } catch (error) {
    logger.error(error);
    throw new authError.DataBaseError('Error on deleting email verification');
  }
};

// 이메일 인증 정보를 생성하는 함수
const createEmailVerification = async new_email_verification => {
  try {
    const created_verification = await prisma.emailVerification.create({
      data: new_email_verification,
    });
    return created_verification;
  } catch (error) {
    logger.error(error);
    throw new authError.DataBaseError('Error on creating email verification');
  }
};

// 만료된 이메일 인증 정보를 삭제하는 함수
const deleteExpiredEmailVerifications = async () => {
  try {
    const deleted = await prisma.emailVerification.deleteMany({
      where: {
        codeExpires: {
          lt: new Date(), // 현재 시간보다 작은 (만료된) 인증 코드 삭제
        },
      },
    });
    return deleted; // 삭제된 항목 반환
  } catch (error) {
    logger.error(error);
    throw new authError.DataBaseError('Error on deleting expired email verification');
  }
};

const setEmailVerifiedTrue = async email => {
  try {
    const updated_verification = await prisma.emailVerification.update({
      where: {
        email: email, // 해당 이메일을 찾음
      },
      data: {
        verified: true, // verified 값을 true로 설정
      },
    });
    return { id: updated_verification.id, email: updated_verification.email, verified: updated_verification.verified }; // 업데이트된 정보 반환
  } catch (error) {
    logger.error(error);
    throw new authError.DataBaseError('Error on updating email verification');
  }
};

//register-api
const createUser = async new_user => {
  try {
    const created_user = await prisma.user.create({
      data: new_user,
    });
    return created_user;
  } catch (error) {
    logger.error(error);
    throw new authError.DataBaseError('Error on creating email verification');
  }
};

//register-api
const findEmailVerificationById = async id => {
  const email_verification = await prisma.emailVerification.findUnique({
    where: { id },
  });
  return email_verification;
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
    logger.error(error);
    throw new databaseError.DataBaseError('DataBase Error on Kakao login');
  }
};

const checkNickname = async nickname => {
  try {
    const existingUser = await prisma.user.findMany({
      where: { nickname },
      select: { id: true },
    });
    return existingUser;
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Database error while checking nickname');
  }
};

const changePassword = async (user_id, new_password) => {
  try {
    // 새로운 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // 비밀번호 업데이트
    await prisma.user.update({
      where: { id: user_id },
      data: { password: hashedPassword },
    });

    return { message: '비밀번호가 성공적으로 변경되었습니다.' };
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('비밀번호 변경 중 데이터베이스 오류 발생');
  }
};

export default {
  findUserById,
  findUserByEmail,
  findEmailVerification,
  deleteEmailVerification,
  createEmailVerification,
  deleteExpiredEmailVerifications,
  setEmailVerifiedTrue,
  createUser,
  findEmailVerificationById,
  signUpKakao,
  checkNickname,
  changePassword,
};
