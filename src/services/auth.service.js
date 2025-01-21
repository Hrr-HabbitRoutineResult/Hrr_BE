import jwt from 'jsonwebtoken';
import authRepository from '../repositories/auth.repository.js';
import authError, { SendmailError } from '../errors/auth.error.js';
import sendmail from '../utils/sendmail.util.js';
import crypto from 'crypto';

//emailLogin-api
const generateTokens = payload => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
  return { access_token, refresh_token };
};

//refreshToken-api
const verifyRefreshToken = token => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

//emailLogin-api
const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new authError.UserNotExistError('존재하지 않는 이메일입니다.', { email });
  }
  if (user.password !== password) {
    throw new authError.PasswordMismatchError('비밀번호가 일치하지 않습니다.', { password });
  }
  return email;
};

//sendVerficationEmail-api
const sendVerificationEmail = async email => {
  const user = await authRepository.findUserByEmail(email);
  if (user) {
    throw new authError.UserAlreadyExistsError('이미 가입된 이메일입니다.', { email });
  }

  const verificationCode = generateVerificationCode();
  const email_verification = await authRepository.findEmailVerification(email);

  if (email_verification) {
    await authRepository.deleteEmailVerification(email);
  }

  const new_email_verification = {
    email,
    verificationCode,
    codeExpires: new Date(Date.now() + 15 * 60 * 1000),
  };

  await authRepository.createEmailVerification(new_email_verification);
  try {
    await sendmail.sendVerificationEmail(email, verificationCode);
  } catch (error) {
    throw new SendmailError('이메일 전송 중 오류가 발생했습니다.');
  }
};

//sendVerficationEmail-api
const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // 6자리 코드 생성
};

//register-api
const register = async dto => {
  const { email, password, verification_id } = dto;

  const verificated_email = await authRepository.findEmailVerificationById(verification_id);
  if (!verificated_email) {
    throw new authError.EmailVerificationError('인증되지 않은 이메일입니다.');
  }

  const user = await authRepository.findUserByEmail(email);
  if (user) {
    throw new authError.UserAlreadyExistsError('이미 가입된 이메일입니다.', { email });
  }

  const email_verification = await authRepository.findEmailVerification(email);
  if (!email_verification) {
    throw new authError.EmailVerificationNotExistsError('이메일 인증이 완료되지 않았습니다.', { email });
  }

  if (email_verification.verifyied) {
    throw new authError.EmailVerificationNotExistsError('이메일 인증이 완료되지 않았습니다.', { email });
  }

  const new_user = {
    email: email,
    password: password,
    name: '사용자',
    phoneNumber: '010012345678',
    followerCount: 0,
    followingCount: 0,
    points: 0,
  };

  const created_user = await authRepository.createUser(new_user);

  // 성공적으로 등록된 경우
  return { created_user };
};

//checkEmailVerificationCode-api
const checkEmailVerificationCode = async (email, verification_code) => {
  const email_verification = await authRepository.findEmailVerification(email);
  if (!email_verification) {
    throw new authError.EmailVerificationNotExistsError('이메일 인증이 완료되지 않았습니다.', { email });
  }

  const currentTime = Date.now();
  if (email_verification.codeExpires < currentTime) {
    throw new authError.EmailVerificationExpiredError('인증 코드가 만료되었습니다.', { email });
  }

  if (email_verification.verificationCode !== verification_code) {
    throw new authError.InvalidVerificationCodeError('잘못된 인증 코드입니다.', { email });
  }
  const updated_verification = await authRepository.setEmailVerifiedTrue(email);
  return updated_verification;
};

export default {
  generateTokens,
  verifyRefreshToken,
  login,
  sendVerificationEmail,
  register,
  checkEmailVerificationCode,
};
