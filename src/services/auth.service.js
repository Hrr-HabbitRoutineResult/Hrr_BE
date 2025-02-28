import jwt from 'jsonwebtoken';
import authRepository from '../repositories/auth.repository.js';
import authError, { SendmailError } from '../errors/auth.error.js';
import sendmail from '../utils/sendmail.util.js';
import crypto from 'crypto';
import axios from 'axios';
import bcrypt from 'bcrypt';

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
  const is_password_valid = await bcrypt.compare(password, user.password);
  if (!is_password_valid) {
    throw new authError.PasswordMismatchError('비밀번호가 일치하지 않습니다.');
  }
  if (user.isDeleted) {
    throw new authError.UserQuitError('이미 탈퇴한 유저입니다.');
  }
  return user.id;
};

//sendVerficationEmail-api
const sendVerificationEmail = async email => {
  // const user = await authRepository.findUserByEmail(email);
  // if (user) {
  //   throw new authError.UserAlreadyExistsError('이미 가입된 이메일입니다.', { email });
  // }

  const verification_code = generateCode(6);
  const email_verification = await authRepository.findEmailVerification(email);

  if (email_verification) {
    await authRepository.deleteEmailVerification(email);
  }

  const new_email_verification = {
    email,
    verificationCode: verification_code,
    codeExpires: new Date(Date.now() + 15 * 60 * 1000),
  };

  await authRepository.createEmailVerification(new_email_verification);
  try {
    await sendmail.sendVerificationEmail(email, verification_code);
  } catch (error) {
    throw new SendmailError('이메일 전송 중 오류가 발생했습니다.');
  }
};

//sendVerficationEmail-api
const generateCode = size => {
  return crypto
    .randomBytes(size / 2)
    .toString('hex')
    .toUpperCase();
};

//register-api
const register = async dto => {
  const { email, password, nickname, verification_id } = dto;

  const user = await authRepository.findUserByEmail(email);
  if (user) {
    throw new authError.UserAlreadyExistsError('이미 가입된 이메일입니다.', { email });
  }

  const verificated_email = await authRepository.findEmailVerificationById(verification_id);
  if (!verificated_email) {
    throw new authError.EmailVerificationError('인증되지 않은 이메일입니다.');
  }

  const email_verification = await authRepository.findEmailVerification(email);
  if (!email_verification) {
    throw new authError.EmailVerificationNotExistsError('이메일 인증이 완료되지 않았습니다.', { email });
  }

  if (email_verification.verifyied) {
    throw new authError.EmailVerificationNotExistsError('이메일 인증이 완료되지 않았습니다.', { email });
  }

  const hashed_password = await bcrypt.hash(password, 10);

  const new_user = {
    email: email,
    password: hashed_password,
    nickname: nickname,
    phoneNumber: '010012345678',
    followerCount: 0,
    followingCount: 0,
    points: 0,
  };

  const created_user = await authRepository.createUser(new_user);
  const { access_token, refresh_token } = generateTokens({
    email: created_user.email,
    id: created_user.id,
  });
  // 성공적으로 등록된 경우
  return {
    id: created_user.id,
    email: created_user.email,
    nickname: created_user.nickname,
    accessToken: access_token,
    refreshToken: refresh_token,
  };
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

// Kakao 소셜 로그인
const signInKakao = async kakao_token => {
  try {
    // 1. 카카오 API를 호출하여 사용자 정보 가져오기
    const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakao_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const { data } = result;
    const kakao_id = data.id; // 카카오 유저의 고유 ID
    const email = data.kakao_account?.email;

    if (!email) {
      throw new authError.UserNotExistError('존재하지 않는 이메일입니다.');
    }

    // 2. DB에서 사용자 조회
    let user = await authRepository.findUserByEmail(email);

    // 3. 신규 사용자라면 회원가입 처리
    if (!user) {
      user = await authRepository.signUpKakao(email);
    }
    const id = user.id;
    // 3. JWT 발급
    const access_token = jwt.sign({ kakao_id, email, id }, process.env.ACCESS_TOKEN_SECRET);
    const refresh_token = jwt.sign({ kakao_id, email, id }, process.env.REFRESH_TOKEN_SECRET);

    return { userId: id, accessToken: access_token, refreshToken: refresh_token };
  } catch (error) {
    throw new authError.KakaoLoginError('카카오 로그인 실패');
  }
};

const checkNickname = async nickname => {
  const response = await authRepository.checkNickname(nickname);
  if (response.length) return { check: true };
  else return { check: false };
};

const resetPasswordByEmail = async email => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new authError.UserNotExistError('존재하지 않는 이메일입니다.', { email });
  }
  const temp_password = generateCode(8);

  const response = await authRepository.changePassword(user.id, temp_password);
  try {
    await sendmail.sendVerificationEmail(email, temp_password);
  } catch (error) {
    throw new SendmailError('이메일 전송 중 오류가 발생했습니다.');
  }
  return response;
};

const changePassword = async (user_id, new_password) => {
  const response = await authRepository.changePassword(user_id, new_password);
  return response;
};

const checkPassword = async (user_id, password) => {
  const user = await authRepository.findUserById(user_id);
  if (!user) {
    throw new authError.UserNotExistError('존재하지 않는 사용자입니다.');
  }
  const is_password_valid = await bcrypt.compare(password, user.password);
  if (!is_password_valid) {
    throw new authError.PasswordMismatchError('비밀번호가 일치하지 않습니다.');
  }
  return { message: '비밀번호 인증이 완료되었습니다.' };
};

export default {
  generateTokens,
  verifyRefreshToken,
  login,
  sendVerificationEmail,
  register,
  checkEmailVerificationCode,
  signInKakao,
  checkNickname,
  resetPasswordByEmail,
  changePassword,
  checkPassword,
};
