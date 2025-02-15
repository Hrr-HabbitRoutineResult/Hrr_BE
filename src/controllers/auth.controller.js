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
    return res.success({ userId: user_id, accessToken: access_token, refreshToken: refresh_token }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req, res) => {
  const refresh_token = req.body.refreshToken;
  console.log(refresh_token)
  if (!refresh_token) {
    throw new authError.RefreshTokenMissingError('Refresh token required');
  }
  try {
    const user = authService.verifyRefreshToken(refresh_token);
    const { access_token } = authService.generateTokens({
      id: user.id,
      email: user.email,
    });
    return res.success({ access_token }, StatusCodes.OK);
  } catch (error) {
    logger.error('Error during token refresh:', error);
    throw new authError.RefreshTokenError('Invalid refresh token');
  }
};

const kakaoLogin = async (req, res, next) => {
  try {
    const { kakao_token } = req.body;

    // 토큰 유효성 검증
    if (!kakao_token) {
      throw new authError.MissingKakaoTokenError('카카오 토큰이 없습니다.');
    }

    // 카카오 로그인 처리
    const access_token = await authService.signInKakao(kakao_token);

    // 로그인 성공 시 액세스 토큰 반환
    return res.status(StatusCodes.OK).json(access_token);
  } catch (error) {
    next(error);
  }
};

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

const checkNickname = async (req, res, next) => {
  try {
    const nickname = req.body.nickname;
    const nickname_check = await authService.checkNickname(nickname);
    return res.success(nickname_check, StatusCodes.OK);
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
  checkNickname,
};
