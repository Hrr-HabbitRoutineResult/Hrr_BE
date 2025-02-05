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
    return res.status(StatusCodes.OK).json({ accessToken: access_token, refreshToken: refresh_token });
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
    return res.status(StatusCodes.OK).json({ accessToken });
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
    return res.status(StatusCodes.OK).json(new_user);
  } catch (error) {
    next(error);
const kakaoLogin = async (req, res, next) => {
  /**
  #swagger.summary = '카카오 로그인 API';
  #swagger.description = '카카오 OAuth 토큰을 사용하여 사용자를 인증합니다.';
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    description: '카카오 OAuth 토큰 인증 요청 정보',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            kakaoAccessToken: { type: 'string', example: 'kakao_token_here' }
          },
          required: ['kakaoAccessToken']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '로그인 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'jwt_token_here' },
            refreshToken: { type: 'string', example: 'refresh_token_here' }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: '잘못된 요청',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Invalid Kakao token.' }
          }
        }
      }
    }
  };
  #swagger.responses[401] = {
    description: '인증 실패',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Authentication failed.' }
          }
        }
      }
    }
  };
   */
  try {
    const { kakao_token } = req.body;

    // 토큰 유효성 검증
    if (!kakao_token) {
      throw new authError.MissingTokenError('카카오 토큰이 없습니다.');
    }

    // 카카오 로그인 처리
    const access_token = await authService.signInKakao(kakao_token);

    // 로그인 성공 시 액세스 토큰 반환
    return res.status(StatusCodes.OK).json(access_token);
  } catch (error) {
    next(error);
  }
};
const naverLogin = () => {
  /**
#swagger.summary = '네이버 로그인 API';
#swagger.description = '네이버 OAuth 토큰을 사용하여 사용자를 인증합니다.';
#swagger.tags = ['Auth'];
#swagger.requestBody = {
  required: true,
  description: '네이버 OAuth 토큰 인증 요청 정보',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          naverAccessToken: { type: 'string', example: 'naver_token_here' }
        },
        required: ['naverAccessToken']
      },
    }
  }
};
#swagger.responses[200] = {
  description: '로그인 성공',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'jwt_token_here' },
          refreshToken: { type: 'string', example: 'refresh_token_here' }
        }
      }
    }
  }
};
#swagger.responses[400] = {
  description: '잘못된 요청',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'FAILURE' },
          error: { type: 'string', example: 'Invalid Naver token.' }
        }
      }
    }
  }
};
#swagger.responses[401] = {
  description: '인증 실패',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'FAILURE' },
          error: { type: 'string', example: 'Authentication failed.' }
        }
      }
    }
  }
};

const sendVerificationCode = async (req, res, next) => {
  try {
    const email = req.body.email;
    const verification_code = await authService.sendVerificationEmail(email);
    return res.status(StatusCodes.OK).json({ email });
  } catch (error) {
    next(error);
  }
};

const checkEmailVerificationCode = async (req, res, next) => {
  try {
    const { email, verification_code } = authDTO.emailVerificationCodeDto(req.body);
    const email_verification = await authService.checkEmailVerificationCode(email, verification_code);
    return res.status(StatusCodes.OK).json(email_verification);
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
