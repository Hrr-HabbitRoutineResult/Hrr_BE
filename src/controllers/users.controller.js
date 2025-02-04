import { StatusCodes } from 'http-status-codes';
import userService from '../services/users.service.js';
import userDto from '../dtos/user.dto.js';

const putUserInterests = () => {};
const getMe = async (req, res, next) => {
  try {
    const my_email = req.user.email;
    const my_info = await userService.getUserInfoByEmail(my_email);

    return res.status(StatusCodes.OK).json(my_info);
  } catch (error) {
    next(error);
  }
};
const putMe = async (req, res, next) => {
  try {
    const email = req.user.email;
    const my_new_info = await userService.updateUserInfobyEmail(email, userDto.updateUserInfoRequestDto(req.body));

    return res.status(StatusCodes.OK).json(my_new_info);
  } catch (error) {
    next(error);
  }
};

const getUserChallengesOngoing = async (req, res, next) => {
  try {
    const id = req.user.id;
    const ongoing_challenge = await userService.getOngoingChallenge(id);

    return res.status(StatusCodes.OK).json(ongoing_challenge);
  } catch (error) {
    next(error);
  }
};
const getUserChallengesCompleted = async (req, res, next) => {
  try {
    const id = req.user.id;
    const completed_challenge = await userService.getCompletedChallenge(id);

    return res.status(StatusCodes.OK).json(completed_challenge);
  } catch (error) {
    next(error);
  }
};
const getUserChallengesHistory = async (req, res, next) => {
  try {
    const id = req.user.id;
    const challenge_history = await userService.getUserChallengeHistory(id);

    return res.status(StatusCodes.OK).json(challenge_history);
  } catch (error) {
    next(error);
  }
};
const getUserBadges = async (req, res, next) => {
  try {
    const id = req.user.id;
    const all_badges = await userService.getUserBadgesById(id);

    return res.status(StatusCodes.OK).json(all_badges);
  } catch (error) {
    next(error);
  }
};
const postUserFollow = async (req, res, next) => {
  try {
    const followed_user_id = req.params.followedUserId;
    const user_id = req.user.id;
    const response = await userService.postUserFollowById(user_id, Number(followed_user_id));

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};
const deleteUserFollow = async (req, res, next) => {
  try {
    const unfollowed_user_id = req.params.unfollowedUserId;
    const user_id = req.user.id;
    const response = await userService.deleteUserFollowById(user_id, Number(unfollowed_user_id));

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getUserVerificationScraps = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const response = await userService.getUserVerificationScraps(user_id);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getUserVerificationLikes = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const response = await userService.getUserVerificationLikes(user_id);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getUserBadgesConditions = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const badges_condition = await userService.getUserBadgesConditionById(user_id);

    return res.status(StatusCodes.OK).json(badges_condition);
  } catch (error) {
    next(error);
  }
};

const getUserLevel = async (req, res, next) => {
  /**
#swagger.summary = '사용자 레벨 조회 API';
#swagger.description = '사용자의 레벨과 포인트를 조회합니다.';
#swagger.tags = ['User'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer <access_token>' },
  description: '인증을 위한 액세스 토큰 (Bearer 형태로 전달)'
};
#swagger.responses[200] = {
  description: '사용자 레벨 조회 성공',
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
                  userId: { type: 'integer', example: 1 },
                  level: { type: 'string', example: 'gold' },
                  points: { type: 'integer', example: 150 },
                  achieved: { type: 'boolean', example: 'true'}
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
    const user_id = req.user.id;
    const user_level = await userService.getUserLevelById(user_id);

    return res.status(StatusCodes.OK).json(user_level);
  } catch (error) {
    next(error);
  }
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
  getUserVerificationScraps,
  getUserVerificationLikes,
  getUserBadgesConditions,
  getUserLevel,
  blockUser,
};
