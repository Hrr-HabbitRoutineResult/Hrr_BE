import { StatusCodes } from 'http-status-codes';
import participationService from '../../services/challenge/participation.service.js';

const joinChallenge = async (req, res, next) => {
  /**
  #swagger.summary = '특정 챌린지 참가 API';
  #swagger.description = '사용자가 특정 챌린지에 참가하는 API입니다.';
  #swagger.tags = ['Challenge'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer {token}' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['Content-Type'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'application/json' },
    description: '요청 본문의 콘텐츠 타입'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '101' },
    description: '참가하려는 챌린지의 ID'
  };
  #swagger.requestBody = {
    required: true,
    description: '참가 요청 본문 데이터',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            userId: { type: 'string', example: 'user123', description: '참가하는 사용자의 ID' },
            joinDate: { type: 'string', format: 'date-time', example: '2025-01-06T15:00:00Z', description: '참가 날짜' }
          },
          required: ['userId', 'joinDate']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '챌린지 참가 성공',
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
                challengeId: { type: 'string', example: '101' },
                userId: { type: 'string', example: 'user123' },
                joinDate: { type: 'string', format: 'date-time', example: '2025-01-06T15:00:00Z' },
                message: { type: 'string', example: 'You have successfully joined the challenge.' }
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
            resultType: { type: 'string', example: 'FAIL' },
            error: { 
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'C100' },
                reason: { type: 'string', example: 'Invalid request data.' }
              }
            },
            success: { type: 'object', nullable: true, example: null }
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
    description: '챌린지를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Challenge not found.' }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Internal server error.' }
          }
        }
      }
    }
  };
   */
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const join_challenge = await participationService.joinChallenge(user_id, challenge_id);
    return res.status(StatusCodes.OK).json(join_challenge);
  } catch (error) {
    next(error);
  }
};
const likeChallenge = async (req, res, next) => {
  /**
#swagger.summary = '챌린지 좋아요 기능 API';
#swagger.description = '사용자가 특정 챌린지에 좋아요를 추가하는 API입니다.';
#swagger.tags = ['Challenge'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer {token}' },
  description: '인증을 위한 액세스 토큰'
};
#swagger.parameters['Content-Type'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'application/json' },
  description: '요청 본문의 콘텐츠 타입'
};
#swagger.parameters['challengeId'] = {
  in: 'path',
  required: true,
  schema: { type: 'string', example: '101' },
  description: '좋아요를 추가할 챌린지의 ID'
};
#swagger.requestBody = {
  required: true,
  description: '좋아요 요청 본문 데이터',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
        },
      },
    }
  }
};
#swagger.responses[200] = {
  description: '챌린지 좋아요 성공',
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
              challengeId: { type: 'string', example: '101' },
              userId: { type: 'string', example: '123' },
              message: { type: 'string', example: 'Challenge liked successfully.' }
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
          resultType: { type: 'string', example: 'FAIL' },
          error: { 
            type: 'object',
            properties: {
              errorCode: { type: 'string', example: 'C200' },
              reason: { type: 'string', example: 'Invalid request data.' }
            }
          },
          success: { type: 'object', nullable: true, example: null }
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
  description: '챌린지를 찾을 수 없음',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'NOT_FOUND' },
          error: { type: 'string', example: 'Challenge not found.' }
        }
      }
    }
  }
};
#swagger.responses[500] = {
  description: '서버 오류',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'FAILURE' },
          error: { type: 'string', example: 'Internal server error.' }
        }
      }
    }
  }
};
 */
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const like_challenge = await participationService.increaseChallengeLike(user_id, challenge_id);
    return res.status(StatusCodes.OK).json(like_challenge);
  } catch (error) {
    next(error);
  }
};

const unlikeChallenge = async (req, res, next) => {
  /**
   * #swagger.summary = '챌린지 좋아요 취소 API'
   * #swagger.description = '특정 챌린지에 대한 좋아요를 취소하는 API입니다.'
   * #swagger.tags = ['Challenge']
   * #swagger.parameters['Authorization'] = {
   *   in: 'header',
   *   required: true,
   *   schema: { type: 'string', example: 'Bearer {token}' },
   *   description: '인증을 위한 액세스 토큰'
   * }
   * #swagger.parameters['Content-Type'] = {
   *   in: 'header',
   *   required: true,
   *   schema: { type: 'string', example: 'application/json' },
   *   description: '요청 본문의 콘텐츠 타입'
   * }
   * #swagger.parameters['challengeId'] = {
   *   in: 'path',
   *   required: true,
   *   schema: { type: 'string', example: '1' },
   *   description: '좋아요를 취소할 챌린지 ID'
   * }
   * #swagger.responses[200] = {
   *   description: '좋아요 취소 성공',
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'object',
   *         properties: {
   *           resultType: { type: 'string', example: 'SUCCESS' },
   *           error: { type: 'object', nullable: true, example: null },
   *           success: {
   *             type: 'object',
   *             properties: {
   *               id: { type: 'integer', example: 5, description: '좋아요 ID' },
   *               user_id: { type: 'integer', example: 5, description: '사용자 ID' },
   *               challenge_id: { type: 'integer', example: 1, description: '챌린지 ID' },
   *               update_challenge_like: { type: 'integer', example: 5, description: '업데이트된 좋아요 수' }
   *             }
   *           }
   *         }
   *       }
   *     }
   *   }
   * }
   * #swagger.responses[400] = {
   *   description: '잘못된 요청',
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'object',
   *         properties: {
   *           resultType: { type: 'string', example: 'FAIL' },
   *           error: {
   *             type: 'object',
   *             properties: {
   *               errorCode: { type: 'string', example: 'A100' },
   *               reason: { type: 'string', example: '잘못된 요청입니다.' }
   *             }
   *           },
   *           success: { type: 'object', nullable: true, example: null }
   *         }
   *       }
   *     }
   *   }
   * }
   * #swagger.responses[401] = {
   *   description: '인증 실패',
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'object',
   *         properties: {
   *           resultType: { type: 'string', example: 'FAIL' },
   *           error: { type: 'string', example: 'Unauthorized access.' }
   *         }
   *       }
   *     }
   *   }
   * }
   * #swagger.responses[404] = {
   *   description: '챌린지를 찾을 수 없음',
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'object',
   *         properties: {
   *           resultType: { type: 'string', example: 'FAIL' },
   *           error: { type: 'string', example: '챌린지를 찾을 수 없습니다.' }
   *         }
   *       }
   *     }
   *   }
   * }
   * #swagger.responses[500] = {
   *   description: '서버 오류',
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'object',
   *         properties: {
   *           resultType: { type: 'string', example: 'FAILURE' },
   *           error: { type: 'string', example: 'Internal server error.' }
   *         }
   *       }
   *     }
   *   }
   * }
   */
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const unlike_challenge = await participationService.decreaseChallengeLike(user_id, challenge_id);
    return res.status(StatusCodes.OK).json(unlike_challenge);
  } catch (error) {
    next(error);
  }
};

const participateInChallenge = () => {
  /**
  #swagger.summary = '나의 챌린지 인증 현황 조회 API';
  #swagger.description = '특정 챌린지에서 사용자의 인증 현황(이름, 사진, 인증 횟수, 미인증 횟수, 인증 상세 목록)을 조회하는 API입니다.';
  #swagger.tags = ['Challenge'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['Id'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '101' },
    description: '조회하려는 챌린지의 ID'
  };
  #swagger.responses[200] = {
    description: '챌린지 인증 현황 조회 성공',
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
                message: { type: 'string', example: '마이페이지 인증 현황 조회 성공' },
                data: {
                  type: 'object',
                  properties: {
                    UserInfo: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '1' },
                        name: { type: 'string', example: '홍길동' },
                        profilePhoto: { type: 'string', example: 'https://image.com' }
                      }
                    },
                    Verifications: {
                      type: 'object',
                      properties: {
                        verifyCount: { type: 'string', example: '25' },
                        unverifyCount: { type: 'string', example: '0' }
                      }
                    },
                    VerificationList: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: '1' },
                          type: { type: 'string', example: 'camera' },
                          created_at: { type: 'string', format: 'date', example: '2025-01-07' },
                          photoUrl: { type: 'string', example: 'https://image.com', nullable: true },
                          textUrl: { type: 'string', example: 'https://notion.com', nullable: true },
                          title: { type: 'string', example: '해피뉴이어~! 올해 첫번째 인증합니다.' },
                          content: { type: 'string', example: '인증 올립니다.', nullable: true }
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
  #swagger.responses[400] = {
    description: '잘못된 요청',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAIL' },
            error: { 
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'C700' },
                reason: { type: 'string', example: 'Invalid request data.' }
              }
            },
            success: { type: 'object', nullable: true, example: null }
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
    description: '챌린지를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Challenge not found.' }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Internal server error.' }
          }
        }
      }
    }
  };
   */
};
const getChallengerList = async (req, res, next) => {
  /**
  #swagger.summary = '챌린저 리스트 조회 API';
  #swagger.description = '특정 챌린지에 참가한 챌린저 리스트를 조회하는 API입니다. 각 챌린저의 인증 횟수와 상태도 함께 표시됩니다.';
  #swagger.tags = ['Challenge'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer {access_token}' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '101' },
    description: '챌린지 ID'
  };
  #swagger.responses[200] = {
    description: '챌린저 리스트 조회 성공',
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
                challengerslist: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      userId: { type: 'integer', example: 1 },
                      name: { type: 'string', example: '홍길동' },
                      profilePhoto: { type: 'string', example: 'https://profile1.com' },
                      verifyCount: { type: 'integer', example: 5 },
                      status: { type: 'string', example: 'verified', description: '인증 상태 (verified, unverified)' }
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
            resultType: { type: 'string', example: 'FAIL' },
            error: { 
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'C600' },
                reason: { type: 'string', example: 'Invalid request data.' }
              }
            },
            success: { type: 'object', nullable: true, example: null }
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
    description: '챌린지를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Challenge not found.' }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Internal server error.' }
          }
        }
      }
    }
  };
   */
};
const kickChallenger = () => {
  /**
  #swagger.summary = '챌린저 리스트 내보내기 API';
  #swagger.description = '특정 챌린지에서 3회 미인증한 챌린저를 내보낼 수 있는 API입니다.';
  #swagger.tags = ['Challenge'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer {access_token}' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '3' },
    description: '챌린지 ID'
  };
  #swagger.responses[200] = {
    description: '챌린저 리스트 조회 및 내보내기 성공',
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
                challengeInfo: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 3 },
                    challengeType: { type: 'string', example: 'basic' },
                    unverifiyCount: { type: 'integer', example: 3 },
                    verifyStatus: { type: 'string', example: 'kick' }
                  }
                },
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      name: { type: 'string', example: '홍길동' },
                      profilePhoto: { type: 'string', example: 'https://profileImage1.com' }
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
            resultType: { type: 'string', example: 'FAIL' },
            error: { 
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'C500' },
                reason: { type: 'string', example: 'Invalid request data.' }
              }
            },
            success: { type: 'object', nullable: true, example: null }
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
    description: '챌린지 또는 챌린저를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Challenge not found.' }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Internal server error.' }
          }
        }
      }
    }
  };
   */
};
const getChallengeCalendar = () => {
  /**
  #swagger.summary = '챌린지 인증 달력 조회 API';
  #swagger.description = '특정 챌린지에서 사용자가 인증한 날과 인증하지 않은 날들이 표시된 달력을 조회하는 API입니다.';
  #swagger.tags = ['Challenge'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '1' },
    description: '조회하려는 챌린지의 ID'
  };
  #swagger.responses[200] = {
    description: '챌린지 인증 달력 조회 성공',
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
                challengeId: { type: 'integer', example: 1 },
                challengeType: { type: 'string', example: 'study' },
                year: { type: 'integer', example: 2025 },
                month: { type: 'integer', example: 1 },
                userId: { type: 'integer', example: 1 },
                verificationSummary: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      date: { type: 'string', format: 'date', example: '2025-01-01' },
                      status: { type: 'string', example: 'verified', description: '인증 상태 (verified, unverified)' }
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
            resultType: { type: 'string', example: 'FAIL' },
            error: { 
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'C400' },
                reason: { type: 'string', example: 'Invalid request data.' }
              }
            },
            success: { type: 'object', nullable: true, example: null }
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
    description: '챌린지를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Challenge not found.' }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Internal server error.' }
          }
        }
      }
    }
  };
   */
};

export default {
  joinChallenge,
  likeChallenge,
  unlikeChallenge,
  participateInChallenge,
  getChallengerList,
  kickChallenger,
  getChallengeCalendar,
};
