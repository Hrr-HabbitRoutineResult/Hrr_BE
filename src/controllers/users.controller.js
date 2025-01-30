import { StatusCodes } from 'http-status-codes';
import userService from '../services/users.service.js';
import userDto from '../dtos/user.dto.js';

const putUserInterests = () => {};
const getMe = async (req, res, next) => {
  /**
#swagger.summary = '사용자 정보 조회 API';
#swagger.description = '사용자의 기본 정보를 조회합니다.';
#swagger.tags = ['User'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer <access_token>' },
  description: '인증을 위한 액세스 토큰 (Bearer 형태로 전달)'
};
#swagger.responses[200] = {
  description: '사용자 정보 조회 성공',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'SUCCESS' },
          error: { type: 'object', nullable: true, example: null },
          success: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: '홍길동' },
                  gender: { type: 'string', example: '여자' },
                  email: { type: 'string', example: 'example@gmail.com' },
                  phoneNumber: { type: 'string', example: '010-1234-5678' },
                  profilePhoto: { type: 'string', example: 'https://profileImage.com' },
                  level: { type: 'integer', example: 3 },
                  points: { type: 'integer', example: 2000 },
                  followerCount: { type: 'integer', example: 100 },
                  followingCount: { type: 'integer', example: 150 },
                  badges: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'A' },
                        icon: { type: 'string', example: 'https://example.com/badge1.png' }
                      }
                    }
                  }
                }
              }
            }
          }
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
          error: { type: 'string', example: 'Unauthorized access.' }
        }
      }
    }
  }
};
 */
  try {
    const my_email = req.user.email;
    const my_info = await userService.getUserInfoByEmail(my_email);

    return res.status(StatusCodes.OK).json(my_info);
  } catch (error) {
    next(error);
  }
};
const putMe = async (req, res, next) => {
  /**
#swagger.summary = '사용자 정보 수정 API';
#swagger.description = '사용자가 자신의 정보를 수정하는 API입니다.';
#swagger.tags = ['User'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer <access_token>' },
  description: '인증을 위한 액세스 토큰'
};
#swagger.requestBody = {
  required: true,
  description: '사용자 정보 수정 요청 정보',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: '흐르르' },
          profilePhoto: { type: 'string', example: 'https://example.com/newprofile.jpg' },
          badges: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id1: { type: 'integer', example: 1 },
                        id2: { type: 'integer', example: 2 },
                        id3: { type: 'integer', example: 3 }
                      }
                    }
                  }
        },
        required: ['name', 'profilePhoto', 'badges']
      },
    }
  }
};
#swagger.responses[200] = {
  description: '사용자 정보 수정 성공',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'SUCCESS' },
          error: { type: 'object', nullable: true, example: null },
          success: {
            type: 'object',
            properties: {
              name: { type: 'string', example: '흐르르' },
              profilePhoto: { type: 'string', example: 'https://example.com/newprofile.jpg' },
              badges: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id1: { type: 'integer', example: 1 },
                    id2: { type: 'integer', example: 2 },
                    id3: { type: 'integer', example: 3 }
                  }
                }
              }
            }
          }
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
#swagger.responses[401] = {
  description: '인증 실패',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'FAILURE' },
          error: { type: 'string', example: 'Unauthorized access.' }
        }
      }
    }
  }
};
 */
  try {
    const email = req.user.email;
    const my_new_info = await userService.updateUserInfobyEmail(email, userDto.updateUserInfoRequestDto(req.body));

    return res.status(StatusCodes.OK).json(my_new_info);
  } catch (error) {
    next(error);
  }
};

const getUserChallengesOngoing = async (req, res, next) => {
  /**
#swagger.summary = '내 챌린지 조회 API';
#swagger.description = '내가 참여한 챌린지들을 보여주는 API입니다.';
#swagger.tags = ['User'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer {token}' },
  description: '인증을 위한 액세스 토큰'
};
#swagger.responses[200] = {
  description: '내 챌린지 조회 성공',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'SUCCESS' },
          error: { type: 'object', nullable: true, example: null },
          success: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    challengeId: { type: 'integer', example: 1 },
                    name: { type: 'string', example: '자잘자잘' },
                    type: { type: 'string', example: '베이직'},
                    image: { type: 'string', example: 'https://img1' },
                    verification: { type: 'boolean', example: 'true'}
                  }
                }
              }
            }
          }
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
          error: { type: 'string', example: 'Unauthorized access.' }
        }
      }
    }
  }
};
 */
  try {
    const id = req.user.id;
    const ongoing_challenge = await userService.getOngoingChallenge(id);

    return res.status(StatusCodes.OK).json(ongoing_challenge);
  } catch (error) {
    next(error);
  }
};
const getUserChallengesCompleted = async (req, res, next) => {
  /**
#swagger.summary = '완료한 챌린지 조회 API';
#swagger.description = '내가 완료한 챌린지들을 보여주는 API입니다.';
#swagger.tags = ['User'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer {token}' },
  description: '인증을 위한 액세스 토큰'
};
#swagger.responses[200] = {
  description: '완료한 챌린지 조회 성공',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'SUCCESS' },
          error: { type: 'object', nullable: true, example: null },
          success: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    challengeId: { type: 'integer', example: 1 },
                    name: { type: 'string', example: '런런' },
                    image: { type: 'string', example: 'https://img1' },
                    description: { type: 'string', example: '러닝하고 인증하기'}
                  }
                }
              }
            }
          }
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
          error: { type: 'string', example: 'Unauthorized access.' }
        }
      }
    }
  }
};
 */
  try {
    const id = req.user.id;
    const completed_challenge = await userService.getCompletedChallenge(id);

    return res.status(StatusCodes.OK).json(completed_challenge);
  } catch (error) {
    next(error);
  }
};
const getUserChallengesHistory = async (req, res, next) => {
  /**
  #swagger.summary = '챌린지 기록 조회 API';
  #swagger.description = '사용자가 인증한 챌린지 기록을 조회합니다.';
  #swagger.tags = ['User'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.responses[200] = {
    description: '챌린지 기록 조회 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      challengeId: { type: 'integer', example: 1 },
                      title: { type: 'string', example: '30일 걷기 챌린지' },
                      date: { 
                        type: 'array', 
                        items: { type: 'string', example: '2025-01-01' } 
                      },
                      url: { type: 'string', example: 'https://url1.com' }
                    }
                  }
                }
              }
            }
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
            error: { type: 'string', example: 'Unauthorized access.' }
          }
        }
      }
    }
  };
   */
  try {
    const id = req.user.id;
    const challenge_history = await userService.getUserChallengeHistory(id);

    return res.status(StatusCodes.OK).json(challenge_history);
  } catch (error) {
    next(error);
  }
};
const getUserBadges = async (req, res, next) => {
  /**
  #swagger.summary = '사용자 배지 조회 API';
  #swagger.description = '사용자가 획득한 배지 정보를 조회합니다.';
  #swagger.tags = ['User'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.responses[200] = {
    description: '배지 정보 조회 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: {
              type: 'object',
              properties: {
                data: {
                  type: 'object',
                  properties: {
                    typeBadges: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          badgeId: { type: 'integer', example: 1 },
                          name: { type: 'string', example: '오늘부터 챌린저' },
                          icon: { type: 'string', example: 'https://example.com/badge1.png' },
                          isObtained: { type: 'boolean', example: true }
                        }
                      }
                    },
                    categoryBadges: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          badgeId: { type: 'integer', example: 2 },
                          name: { type: 'string', example: '운동 마스터' },
                          icon: { type: 'string', example: 'https://example.com/badge2.png' },
                          isObtained: { type: 'boolean', example: false }
                        }
                      }
                    }
                  }
                }
              }
            }
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
            error: { type: 'string', example: 'Unauthorized access.' }
          }
        }
      }
    }
  };
   */
  try {
    const id = req.user.id;
    const all_badges = await userService.getUserBadgesById(id);

    return res.status(StatusCodes.OK).json(all_badges);
  } catch (error) {
    next(error);
  }
};
const postUserFollow = () => {
  /**
#swagger.summary = '사용자 팔로우 API';
#swagger.description = '특정 사용자를 팔로우합니다.';
#swagger.tags = ['User'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer <access_token>' },
  description: '인증을 위한 액세스 토큰'
};
#swagger.parameters['userId'] = {
  in: 'path',
  required: true,
  schema: { type: 'integer', example: 123 },
  description: '팔로우할 사용자의 ID'
};
#swagger.requestBody = {
  required: false,
  description: '이 요청에는 본문이 필요하지 않습니다.'
  content: {
    'application/json': {
      schema: { type: 'object' },
    }
  }
};
#swagger.responses[200] = {
  description: '사용자 팔로우 성공',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'SUCCESS' },
          error: { type: 'object', nullable: true, example: null },
          success: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'User followed successfully' },
              followedUserId: { type: 'integer', example: 123 }
            }
          }
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
          error: { type: 'string', example: 'Unauthorized access.' }
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
const deleteUserFollow = () => {
  /**
  #swagger.summary = '사용자 언팔로우 API';
  #swagger.description = '특정 사용자를 언팔로우합니다.';
  #swagger.tags = ['User'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 123 },
    description: '언팔로우할 사용자의 ID'
  };
  #swagger.requestBody = {
    required: false,
    description: '이 요청에는 본문이 필요하지 않습니다.'
    content: {
      'application/json': {
        schema: { type: 'object' },
      }
    }
  };
  #swagger.responses[200] = {
    description: '사용자 언팔로우 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'User unfollowed successfully' },
                unfollowedUserId: { type: 'integer', example: 123 }
              }
            }
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
            error: { type: 'string', example: 'Unauthorized access.' }
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
const getUserScraps = () => {
  /**
  #swagger.summary = '스크랩한 글 목록 조회 API';
  #swagger.description = '내가 스크랩한 글들의 목록을 불러오는 API입니다.';
  #swagger.tags = ['User'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <JWT_TOKEN>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 1 },
    description: '사용자의 ID'
  };
  #swagger.responses[200] = {
    description: '스크랩한 글 목록 조회 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: {
              type: 'object',
              properties: {
                posts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      postId: { type: 'integer', example: 101 },
                      title: { type: 'string', example: '안녕하세요' },
                      content: { type: 'string', example: '1번 게시물입니다.' },
                      userName: { type: 'string', example: '흐르르' },
                      userProfilePhoto: { type: 'string', example: 'https://example.com/profiles.jpg' },
                      scrapsCreated_at: { type: 'string', format: 'date', example: '2025-01-06' },
                      postCreated_at: { type: 'string', format: 'date', example: '2024-12-31' }
                    }
                  }
                }
              }
            }
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
            error: { type: 'string', example: 'Unauthorized access.' }
          }
        }
      }
    }
  };
   */
};
const blockUser = () => {
  /**
  #swagger.summary = '이용자 차단 API';
  #swagger.description = '쪽지함에서 특정 이용자를 차단하는 API입니다.';
  #swagger.tags = ['User'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['Content-Type'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'application/json' },
    description: '요청 본문의 콘텐츠 타입'
  };
  #swagger.requestBody = {
    required: true,
    description: '차단할 이용자의 ID',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user_id: { type: 'integer', example: 12345 }
          },
          required: ['user_id']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '이용자 차단 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: {
              type: 'object',
              properties: {
                message: { type: 'string', example: '이용자를 성공적으로 차단했습니다.' }
              }
            }
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
            error: { type: 'string', example: 'Unauthorized access.' }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: '이용자를 찾을 수 없음',
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

export default {
  putUserInterests,
  getMe,
  putMe,
  getUserChallengesOngoing,
  getUserChallengesCompleted,
  getUserChallengesHistory,
  getUserBadges,
  postUserFollow,
  deleteUserFollow,
  getUserScraps,
  blockUser,
};
