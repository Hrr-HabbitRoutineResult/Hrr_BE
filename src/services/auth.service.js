import jwt from 'jsonwebtoken';
import authRepository from '../repositories/auth.repository.js';
import authError from '../errors/auth.error.js';
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

export default {
  generateTokens,
  verifyRefreshToken,
  login,
};
