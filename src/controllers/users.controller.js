import { StatusCodes } from 'http-status-codes';
import userService from '../services/users.service.js';
import userDto from '../dtos/user.dto.js';

const putUserInterests = () => {};
const getMe = async (req, res, next) => {
  try {
    const my_email = req.user.email;
    const my_info = await userService.getUserInfoByEmail(my_email);
    return res.success(my_info, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const putMe = async (req, res, next) => {
  try {
    const email = req.user.email;
    const my_new_info = await userService.updateUserInfobyEmail(email, userDto.updateUserInfoRequestDto(req.body));
    return res.success(my_new_info, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getUserChallengesOngoing = async (req, res, next) => {
  try {
    const id = req.user.id;
    const ongoing_challenge = await userService.getOngoingChallenge(id);
    return res.success(ongoing_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getUserChallengesCompleted = async (req, res, next) => {
  try {
    const id = req.user.id;
    const completed_challenge = await userService.getCompletedChallenge(id);
    return res.success(completed_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getUserChallengesHistory = async (req, res, next) => {
  try {
    const id = req.user.id;
    const challenge_history = await userService.getUserChallengeHistory(id);
    return res.success(challenge_history, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getUserBadges = async (req, res, next) => {
  try {
    const id = req.user.id;
    const all_badges = await userService.getUserBadgesById(id);
    return res.success(all_badges, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const postUserFollow = async (req, res, next) => {
  try {
    const followed_user_id = req.params.followedUserId;
    const user_id = req.user.id;
    const response = await userService.postUserFollowById(user_id, Number(followed_user_id));
    return res.success(response, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const deleteUserFollow = async (req, res, next) => {
  try {
    const unfollowed_user_id = req.params.unfollowedUserId;
    const user_id = req.user.id;
    const response = await userService.deleteUserFollowById(user_id, Number(unfollowed_user_id));
    return res.success(response, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getUserVerificationScraps = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const response = await userService.getUserVerificationScraps(user_id);
    return res.success(response, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getUserVerificationLikes = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const response = await userService.getUserVerificationLikes(user_id);
    return res.success(response, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getUserBadgesConditions = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const badges_condition = await userService.getUserBadgesConditionById(user_id);

    return res.success(badges_condition, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getUserLevel = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const user_level = await userService.getUserLevelById(user_id);

    return res.success(user_level, StatusCodes.OK);
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
