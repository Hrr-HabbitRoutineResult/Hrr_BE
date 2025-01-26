import { StatusCodes } from 'http-status-codes';
import listDto from '../../dtos/challenge/list.dto.js';
import listService from '../../services/challenge/list.service.js';
import logger from '../../logger.js';
const getChallengeList = async (req, res, next) => {
  /**
  #swagger.summary = '챌린지 리스트 조회 API';
  #swagger.description = '챌린지 이름, 종류, 인원 제한, 참가 인원, 인증 방식, 한 줄 설명, 인증 빈도가 포함된 챌린지 리스트를 조회하는 API입니다.';
  #swagger.tags = ['Challenge'];
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
  #swagger.responses[200] = {
    description: '챌린지 리스트 조회 성공',
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
                challenges: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      challengeId: { type: 'string', example: '101' },
                      name: { type: 'string', example: '알고리즘 스터디 챌린지' },
                      type: { type: 'string', example: 'study' },
                      memberLimit: { type: 'integer', example: 20 },
                      currentMembers: { type: 'integer', example: 15 },
                      verificationMethod: { type: 'string', example: '사진 인증' },
                      description: { type: 'string', example: '매일 알고리즘 문제를 풀고 인증하세요.' },
                      frequency: { type: 'string', example: '매일' }
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
    logger.debug('챌린지 리스트를 보여드립니다!');
    logger.debug('Request Query:', req.query); // 디버깅 로그 추가
    //쿼리 파라미터 추출하기
    const { type, category, duration, max_participants, frequency_type, day, name, sort } = req.query;
    const challenge_list = await listService.getChallengeList({
      type: type || null,
      category: category || null,
      duration: duration || null,
      max_participants: max_participants || null,
      frequency_type: frequency_type || null,
      day: day || null,
      name: name || null,
      sort: sort || 'popular', // 기본값 설정
    });
    res.status(StatusCodes.OK).json({ result: challenge_list });
  } catch (error) {
    next(error);
  }
};
const searchChallenge = () => {
  /**
  #swagger.summary = '챌린지 검색 API';
  #swagger.description = '사용자가 특정 조건에 따라 챌린지를 검색하는 API입니다.';
  #swagger.tags = ['Challenge'];
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
  #swagger.parameters['query'] = {
    in: 'query',
    required: false,
    schema: {
      type: 'object',
      properties: {
        keyword: { type: 'string', example: '운동' },
        category: { type: 'string', example: '2' },
        duration: { type: 'string', example: '6m' },
        type: { type: 'string', example: '1' },
        frequency: { type: 'string', example: '2W' }
      }
    },
    description: '검색에 사용할 필터 조건 (키워드, 카테고리, 기간, 타입, 빈도)'
  };
  #swagger.responses[200] = {
    description: '챌린지 검색 성공',
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
                challenges: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '1' },
                      name: { type: 'string', example: '운동을 해보아요' },
                      category: { type: 'string', example: '2' },
                      duration: { type: 'string', example: '1y' },
                      keyword: { type: 'string', example: '운동' },
                      type: { type: 'string', example: '1' },
                      frequency: { type: 'string', example: '2W' }
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
            error: { type: 'string', example: 'Invalid query parameters.' }
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
const getChallengeDetail = async (req, res, next) => {
  /**
  #swagger.summary = '챌린지 검색 API';
  #swagger.description = '사용자가 특정 조건에 따라 챌린지를 검색하는 API입니다. 검색 조건은 쿼리 스트링을 사용합니다.';
  #swagger.tags = ['Challenge'];
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
  #swagger.parameters['query'] = {
    in: 'query',
    required: false,
    schema: {
      type: 'object',
      properties: {
        keyword: { type: 'string', example: '운동' },
        category: { type: 'string', example: '2' },
        duration: { type: 'string', example: '6m' },
        type: { type: 'string', example: '1' },
        frequency: { type: 'string', example: '2W' }
      }
    },
    description: '검색에 사용할 필터 조건 (키워드, 카테고리, 기간, 타입, 빈도)'
  };
  #swagger.responses[200] = {
    description: '챌린지 검색 성공',
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
                challenges: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '1' },
                      name: { type: 'string', example: '운동을 해보아요' },
                      category: { type: 'string', example: '2' },
                      duration: { type: 'string', example: '1y' },
                      keyword: { type: 'string', example: '운동' },
                      type: { type: 'string', example: '1' },
                      frequency: { type: 'string', example: '2W' }
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
            error: { type: 'string', example: 'Invalid query parameters.' }
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
    const challenge_id = parseInt(req.params.challengeId, 10);
    const challenge_info = await listService.getChallengeDetailById(challenge_id);

    return res.status(StatusCodes.OK).json(challenge_info);
  } catch (error) {
    next(error);
  }
};

const createChallenge = async (req, res, next) => {
  /**
  #swagger.summary = '챌린지 개설 API';
  #swagger.description = '사용자가 새로운 챌린지를 개설하는 API입니다. 카테고리, 유형, 사진, 기간, 제한 인원, 인증 수단, 규칙, 키워드를 포함합니다.';
  #swagger.tags = ['Challenge'];
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
    description: '챌린지 개설 요청 본문',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            category: { type: 'string', example: '2', description: '카테고리 ID' },
            type: { type: 'string', example: '1', description: '챌린지 유형' },
            profileImage: { type: 'string', example: 'https://image.', description: '챌린지 대표 이미지 URL' },
            duration: {
              type: 'object',
              properties: {
                startDate: { type: 'string', format: 'date', example: '2025-01-06' },
                finishDate: { type: 'string', format: 'date', example: '2026-01-06' }
              },
              description: '챌린지 기간'
            },
            maxParticipants: { type: 'string', example: '20', description: '제한 인원' },
            verificationMethod: { type: 'string', example: 'camera', description: '인증 방법' },
            rule: { type: 'string', example: '매주 인증하세요', description: '챌린지 규칙' },
            keywords: {
              type: 'array',
              items: { type: 'string', example: '운동' },
              description: '챌린지 키워드'
            }
          },
          required: ['category', 'type', 'profileImage', 'duration', 'maxParticipants', 'verificationMethod', 'rule', 'keywords']
        },
      }
    }
  };
  #swagger.responses[201] = {
    description: '챌린지 개설 성공',
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
                message: { type: 'string', example: '챌린지가 성공적으로 개설되었습니다.' },
                challenge: {
                  type: 'object',
                  properties: {
                    category: { type: 'string', example: '운동' },
                    type: { type: 'string', example: '카메라' },
                    profileImage: { type: 'string', example: 'https://image.' },
                    duration: {
                      type: 'object',
                      properties: {
                        startDate: { type: 'string', example: '2025-01-06' },
                        finishDate: { type: 'string', example: '2026-01-06' }
                      }
                    },
                    maxParticipants: { type: 'string', example: '20' },
                    verificationMethod: { type: 'string', example: 'camera' },
                    rule: { type: 'string', example: '매주 인증하세요' },
                    keywords: {
                      type: 'array',
                      items: { type: 'string', example: '운동' }
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
                errorCode: { type: 'string', example: 'A100' },
                reason: { type: 'string', example: '오류 원인' },
                data: { type: 'object', example: {} }
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
    logger.debug('챌린지를 개설했습니다!');

    const challenge = await listService.createChallenge(listDto.bodyToChallenge(req.body));
    res.status(StatusCodes.OK).json({ result: challenge });
  } catch (error) {
    next(error);
  }
};

export default {
  getChallengeList,
  searchChallenge,
  getChallengeDetail,
  createChallenge,
};
