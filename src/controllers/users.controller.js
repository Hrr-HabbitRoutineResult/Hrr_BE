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
const getUserBadgesConditions = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const badges_condition = await userService.getUserBadgesConditionById(user_id);

    return res.status(StatusCodes.OK).json(badges_condition);
  } catch (error) {
    next(error);
  }
};
const blockUser = () => {};

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
  getUserBadgesConditions,
  blockUser,
};
