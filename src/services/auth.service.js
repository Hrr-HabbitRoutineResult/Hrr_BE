import jwt from 'jsonwebtoken';
import authRepository from '../repositories/auth.repository.js';
import authError from '../errors/auth.error.js';
import axios from 'axios';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

const generateTokens = payload => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  return { accessToken, refreshToken };
};

const verifyRefreshToken = token => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

const login = async (email, password) => {
  const user_password = await authRepository.findUserPassword(email);
  if (user_password !== password) {
    throw new authError.PasswordMismatchError('비밀번호가 일치하지 않습니다.', { password });
  }
  return email;
};

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
    const user = await authRepository.getUserByKakaoId(kakao_id);

    // 3. JWT 발급
    const token = jwt.sign({ kakao_id, email }, process.env.TOKEN_SECRET);

    return { token, user };
  } catch (error) {
    console.error('카카오 로그인 오류:', error);
    throw new Error('카카오 로그인 실패');
  }
};

export default {
  generateTokens,
  verifyRefreshToken,
  login,
  signInKakao,
};
