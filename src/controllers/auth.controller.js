import authService from '../services/auth.service.js';
import { StatusCodes } from 'http-status-codes';
import authError from '../errors/auth.error.js';
import authDTO from '../dtos/auth.dto.js';
import logger from '../logger.js';
export const emailLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user_id = await authService.login(email, password);
    const { access_token, refresh_token } = authService.generateTokens({ email: email, id: user_id });
    return res.success({ accessToken: access_token, refreshToken: refresh_token }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new authError.RefreshTokenMissingError('Refresh token required');
  }
  try {
    const user = authService.verifyRefreshToken(refreshToken);
    const { accessToken } = authService.generateTokens({ username: user.username });
    return res.success({ accessToken }, StatusCodes.OK);
  } catch (error) {
    logger.error('Error during token refresh:', error);
    throw new authError.RefreshTokenError('Invalid refresh token');
  }
};

const kakaoLogin = () => {};
const naverLogin = () => {};
const findEmail = () => {};
const ressetPasswordByPhone = () => {};
const ressetPasswordByEmail = () => {};
const register = async (req, res, next) => {
  try {
    const dto = authDTO.registerDto(req.body);
    const new_user = await authService.register(dto);
    return res.success(new_user, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const sendVerificationCode = async (req, res, next) => {
  try {
    const email = req.body.email;
    const verification_code = await authService.sendVerificationEmail(email);
    return res.success(email, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const checkEmailVerificationCode = async (req, res, next) => {
  try {
    const { email, verification_code } = authDTO.emailVerificationCodeDto(req.body);
    const email_verification = await authService.checkEmailVerificationCode(email, verification_code);
    return res.success(email_verification, StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
};

export default {
  emailLogin,
  kakaoLogin,
  refreshToken,
  naverLogin,
  findEmail,
  ressetPasswordByPhone,
  ressetPasswordByEmail,
  register,
  sendVerificationCode,
  checkEmailVerificationCode,
};
