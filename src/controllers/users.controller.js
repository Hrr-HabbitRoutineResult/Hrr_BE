import { StatusCodes } from 'http-status-codes';
import userService from '../services/users.service.js';
import userDto from '../dtos/user.dto.js';

const putUserInterests = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const interests_category = await userService.putUserInterestCategoryById(
      user_id,
      userDto.putUserInterestRequestDto(req.body),
    );
    return res.success(interests_category, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const user_id = Number(req.params.userId);
    const user_info = await userService.getUserInfoById(user_id);
    return res.success(user_info, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const putMe = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const my_new_info = await userService.updateUserInfobyId(user_id, userDto.updateUserInfoRequestDto(req.body));
    return res.success(my_new_info, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getUserChallengesOngoing = async (req, res, next) => {
  try {
    const user_id = Number(req.params.userId);
    const ongoing_challenge = await userService.getOngoingChallenge(user_id);
    return res.success(ongoing_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getUserChallengesCompleted = async (req, res, next) => {
  try {
    const user_id = Number(req.params.userId);
    const completed_challenge = await userService.getCompletedChallenge(user_id);
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
    const user_id = Number(req.params.userId);
    const all_badges = await userService.getUserBadgesById(user_id);
    return res.success(all_badges, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getUserBadgesLately = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const badge_lately = await userService.getUserLatestBadgeById(user_id);
    return res.success(badge_lately, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const postUserFollow = async (req, res, next) => {
  try {
    const followed_user_id = req.params.followedUserId;
    const user_id = req.user.id;
    followed_user_id;
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
    const badge_id = Number(req.params.badgeId);
    const user_id = req.user.id;
    const badges_condition = await userService.getUserBadgesConditionById(user_id, badge_id);

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

const getFollowerList = async (req, res, next) => {
  try {
    const user_id = Number(req.params.userId);
    const followers = await userService.getFollowerList(user_id);

    return res.success(followers, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getFollowingList = async (req, res, next) => {
  try {
    const user_id = Number(req.params.userId);
    const followings = await userService.getFollowingList(user_id);

    return res.success(followings, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const block_user_id = Number(req.params.userId);
    const user_id = req.user.id;
    const response = await userService.blockUser(user_id, block_user_id);

    return res.success(response, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

const unblockUser = async (req, res, next) => {
  try {
    const unblock_user_id = Number(req.params.userId);
    const user_id = req.user.id;
    const response = await userService.unblockUser(user_id, unblock_user_id);

    return res.success(response, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getBlockedList = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const blocked_list = await userService.getBlockedList(user_id);

    return res.success(blocked_list, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const userQuit = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const response = await userService.userQuit(user_id);

    return res.success(response, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  putUserInterests,
  getUserById,
  putMe,
  getUserChallengesOngoing,
  getUserChallengesCompleted,
  getUserChallengesHistory,
  getUserBadges,
  getUserBadgesLately,
  postUserFollow,
  deleteUserFollow,
  getUserVerificationScraps,
  getUserVerificationLikes,
  getUserBadgesConditions,
  getUserLevel,
  blockUser,
  unblockUser,
  getFollowerList,
  getFollowingList,
  getBlockedList,
  userQuit,
};
