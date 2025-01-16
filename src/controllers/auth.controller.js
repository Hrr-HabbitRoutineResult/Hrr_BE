// // Token Refresh Controller
// export const refreshToken = (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).json({ message: 'Refresh token required' });
//   }

//   try {
//     const user = verifyRefreshToken(refreshToken);
//     const { accessToken } = generateTokens({ username: user.username });
//     res.json({ accessToken });
//   } catch (error) {
//     console.error('Error during token refresh:', error);
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// };

import authService from '../services/auth.service.js';
import logger from '../logger.js';
import { StatusCodes } from 'http-status-codes';
// In-memory storage for refresh tokens and users (for testing)

// Login Controller
export const emailLogin = async (req, res) => {
  /**
  #swagger.summary = '로그인 API';
  #swagger.description = '이메일과 비밀번호로 사용자를 인증하고, JWT 또는 세션 토큰을 반환합니다.';
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    description: '로그인 요청 정보',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'password123' }
          },
          required: ['email', 'password']
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
            error: { type: 'string', example: 'Invalid email or password.' }
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
  const { email, password } = req.body;
  const login = await authService.login(email, password);
  const { accessToken, refreshToken } = authService.generateTokens({ email: email });
  return res.status(StatusCodes.OK).json({ accessToken, refreshToken });
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  // Check if refresh token exists in storage
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  try {
    const user = authService.verifyRefreshToken(refreshToken);
    const { accessToken } = authService.generateTokens({ username: user.username });
    res.json({ accessToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

const kakaoLogin = () => {
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
 */
};
const findEmail = () => {
  /**
  #swagger.summary = '이메일 찾기 API';
  #swagger.description = '사용자의 이름과 휴대폰 번호를 기반으로 이메일을 찾습니다.';
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    description: '이메일 찾기 요청 정보',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John Doe' },
            phoneNumber: { type: 'string', example: '01012345678' }
          },
          required: ['name', 'phoneNumber']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '이메일 찾기 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' }
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
            error: { type: 'string', example: 'Invalid name or phone number.' }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: '사용자를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'User not found.' }
          }
        }
      }
    }
  };
   */
};
const ressetPasswordByPhone = () => {
  /**
  #swagger.summary = '이메일 찾기 API';
  #swagger.description = '사용자의 이름과 휴대폰 번호를 기반으로 이메일을 찾습니다.';
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    description: '이메일 찾기 요청 정보',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John Doe' },
            phoneNumber: { type: 'string', example: '01012345678' }
          },
          required: ['name', 'phoneNumber']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '이메일 찾기 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' }
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
            error: { type: 'string', example: 'Invalid name or phone number.' }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: '사용자를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'User not found.' }
          }
        }
      }
    }
  };
   */
};
const ressetPasswordByEmail = () => {
  /**
  #swagger.summary = '비밀번호 재설정 API';
  #swagger.description = '이메일 인증을 통해 비밀번호를 재설정합니다.';
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    description: '비밀번호 재설정 요청 정보',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            newPassword: { type: 'string', example: 'new_password123' }
          },
          required: ['email', 'newPassword']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '비밀번호 재설정 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Password reset successful' }
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
            error: { type: 'string', example: 'Invalid email or password format.' }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: '사용자를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'User not found.' }
          }
        }
      }
    }
  };
   */
};
const register = () => {
  /**
  #swagger.summary = '회원가입 API';
  #swagger.description = '사용자의 회원가입을 처리합니다.';
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    description: '회원가입 요청 정보',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'password123' },
            name: { type: 'string', example: 'John Doe' },
            phoneNumber: { type: 'string', example: '01012345678' }
          },
          required: ['email', 'password', 'name', 'phoneNumber']
        },
      }
    }
  };
  #swagger.responses[201] = {
    description: '회원가입 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'User registered successfully' }
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
            error: { type: 'string', example: 'Invalid input data.' }
          }
        }
      }
    }
  };
  #swagger.responses[409] = {
    description: '이메일 중복 오류',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'CONFLICT' },
            error: { type: 'string', example: 'Email already exists.' }
          }
        }
      }
    }
  };
   */
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
};
