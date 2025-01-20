import jwt from 'jsonwebtoken';
import authRepository from '../repositories/auth.repository.js';
import authError from '../errors/auth.error.js';
import { userDao } from '../../models/userDao.js';
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

const signInKakao = async kakaoToken => {
  const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const { data } = result;
  const name = data.properties.nickname;
  const email = data.kakao_account.email;
  const kakaoId = data.id;
  const profileImage = data.properties.profile_image;

  if (!name || !email || !kakaoId) {
    throw new Error('KEY_ERROR');
  }

  const user = await userDao.getUserById(kakaoId);

  if (!user) {
    await userDao.signUp(email, name, kakaoId, profileImage);
  }

  return jwt.sign({ kakao_id: kakaoId }, process.env.TOKKENSECRET);
};

export default {
  generateTokens,
  verifyRefreshToken,
  login,
  signInKakao
};
