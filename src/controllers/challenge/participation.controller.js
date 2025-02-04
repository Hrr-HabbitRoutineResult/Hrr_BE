import { StatusCodes } from 'http-status-codes';
import participationService from '../../services/challenge/participation.service.js';

const joinChallenge = async (req, res, next) => {
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
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const unlike_challenge = await participationService.decreaseChallengeLike(user_id, challenge_id);
    return res.status(StatusCodes.OK).json(unlike_challenge);
  } catch (error) {
    next(error);
  }
};

const getUserChallengeVerification = async (req, res, next) => {
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
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: '홍길동' },
                        profilePhoto: { type: 'string', example: 'https://image.com' }
                      }
                    },
                    Verifications: {
                      type: 'object',
                      properties: {
                        verifyCount: { type: 'integer', example: 25 },
                        warnCount: { type: 'integer', example: 0 },
                        achievement_rate: { type: 'integer', example: 100 }
                      }
                    },
                    VerificationList: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          verificationId: { type: 'integer', example: 1 },
                          type: { type: 'string', example: 'camera' },
                          created_at: { type: 'string', format: 'date', example: '2025-01-07' },
                          photoUrl: { type: 'string', example: 'https://image.com', nullable: true },
                          textUrl: { type: 'string', example: 'https://notion.com', nullable: true },
                          title: { type: 'string', example: '해피뉴이어~! 올해 첫번째 인증합니다.' }
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
  try {
    const challenge_id = req.params.challengeId;
    const user_id = req.user.id;
    const response = await participationService.getUserChallengeVerificationbyId(user_id, Number(challenge_id));

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getChallengerList = async (req, res, next) => {
  try {
    const challenge_id = parseInt(req.params.challengeId, 10);
    const challenger_list = await participationService.getChallengerList(challenge_id);
    return res.status(StatusCodes.OK).json(challenger_list);
  } catch (error) {
    next(error);
  }
};
const kickChallenger = () => {};
const getChallengeCalendar = () => {};

export default {
  joinChallenge,
  likeChallenge,
  unlikeChallenge,
  getUserChallengeVerification,
  getChallengerList,
  kickChallenger,
  getChallengeCalendar,
};
