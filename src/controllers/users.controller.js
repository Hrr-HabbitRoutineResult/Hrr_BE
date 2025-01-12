const putUserInterests = () => {};
const getMe = () => {
  /**
#swagger.summary = '사용자 정보 조회 API';
#swagger.description = '사용자의 기본 정보를 조회합니다.';
#swagger.tags = ['User'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer <access_token>' },
  description: '인증을 위한 액세스 토큰'
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
};
const putMe = () => {
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
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: '흐르르' },
          email: { type: 'string', example: 'updated@example.com' },
          gender: { type: 'string', example: '남자' },
          profilePhoto: { type: 'string', example: 'https://example.com/newprofile.jpg' }
        },
        required: ['name', 'email', 'gender', 'profilePhoto']
      },
      description: '사용자 정보 수정 요청 정보'
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
              userInfo: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  phoneNumber: { type: 'string', example: '010-1234-5678' },
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
              },
              data: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: '흐르르' },
                  gender: { type: 'string', example: '남자' },
                  email: { type: 'string', example: 'updated@example.com' },
                  profilePhoto: { type: 'string', example: 'https://example.com/newprofile.jpg' }
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
};
const getUserChallengesOngoing = () => {
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
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: '자잘자잘' },
                    image: { type: 'string', example: 'https://img1' }
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
const getUserChallengesCompleted = () => {
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
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: '자잘자잘' },
                    image: { type: 'string', example: 'https://img1' }
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
const getUserChallengesHistory = () => {
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
};
const getUserBadges = () => {
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
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      badgeId: { type: 'integer', example: 1 },
                      name: { type: 'string', example: '걷기 마스터' },
                      icon: { type: 'string', example: 'https://example.com/badge1.png' },
                      description: { type: 'string', example: '30일 연속 걷기 챌린지 완료' }
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
  content: {
    'application/json': {
      schema: { type: 'object' },
      description: '이 요청에는 본문이 필요하지 않습니다.'
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
    content: {
      'application/json': {
        schema: { type: 'object' },
        description: '이 요청에는 본문이 필요하지 않습니다.'
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
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user_id: { type: 'integer', example: 12345 }
          },
          required: ['user_id']
        },
        description: '차단할 이용자의 ID'
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
