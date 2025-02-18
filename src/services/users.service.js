import userRepository from '../repositories/users.repository.js';
import userDto from '../dtos/user.dto.js';
import authRepository from '../repositories/auth.repository.js';
import badgeRepository from '../repositories/badge.repository.js';
import userError from '../errors/users.error.js';
import { Prisma } from '@prisma/client';
import databaseError from '../errors/database.error.js';

const putUserInterestCategoryById = async (user_id, update_data) => {
  try {
    const updated_data = await userRepository.putUserInterestCategory(user_id, update_data);
    const response_data = userDto.putUserInterestResponseDto(updated_data);

    return response_data;
  } catch (error) {
    throw new databaseError.DataBaseError('DataBase Error on updating user interest');
  }
};

const getUserInfoById = async user_id => {
  //유저 인포 가져오기
  const user_data = await authRepository.findUserById(user_id);
  if (!user_data) {
    throw new userError.UserNotExistError('유저가 존재하지 않습니다.');
  }
  // 초기화된 배지 정보를 담을 변수
  let user_badge_1 = null;
  let user_badge_2 = null;
  let user_badge_3 = null;

  if (user_data.userBadge1_id) {
    user_badge_1 = await badgeRepository.getBadgeById(user_data.userBadge1_id);
  }
  if (user_data.userBadge2_id) {
    user_badge_2 = await badgeRepository.getBadgeById(user_data.userBadge2_id);
  }
  if (user_data.userBadge3_id) {
    user_badge_3 = await badgeRepository.getBadgeById(user_data.userBadge3_id);
  }
  const response_data = userDto.serviceToControllerDto(user_data, user_badge_1, user_badge_2, user_badge_3);

  return response_data;
};

const updateUserInfobyId = async (user_id, update_data) => {
  try {
    const updated_data = await userRepository.updateUserInfo(user_id, update_data);
    const response_data = userDto.updateUserInfoResponseDto(updated_data);

    return response_data;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'A001') {
        // 배지가 없을 경우
        throw new userError.BadgeNotExistError('해당 배지를 찾을 수 없습니다.');
      }
    } // 다른 Prisma 관련 에러 처리
    else {
      throw new databaseError.DataBaseError('DataBase Error on updating user information');
    }
  }
};

const getOngoingChallenge = async user_id => {
  const ongoing_challenges = await userRepository.findOngoingChallenges(user_id);
  const response_data = userDto.userChallengeDto(ongoing_challenges);

  return { ongoingChallenges: response_data };
};

const getCompletedChallenge = async user_id => {
  const completed_challenges = await userRepository.findCompletedChallenges(user_id);
  const response_data = userDto.userChallengeDto(completed_challenges);

  return { completedChallenges: response_data };
};

const getUserChallengeHistory = async id => {
  const challenge_history = await userRepository.findUserChallengeHistory(id);
  const verification_history = await userRepository.findUserVerificationHistory(id);
  const response_data = userDto.userChallengeHistoryDto(challenge_history, verification_history);
  if (!response_data) {
    return null;
  }

  return response_data;
};

const getUserBadgesById = async user_id => {
  const type_badges = await userRepository.findUserTypeBadges(user_id);
  const category_badges = await userRepository.findUserCategoryBadges(user_id);
  const response_data = userDto.userBadgesDto(type_badges, category_badges);
  if (!response_data) {
    return null;
  }

  return response_data;
};

const getUserLatestBadgeById = async user_id => {
  const badge = await userRepository.findUserLatestBadge(user_id);
  const response_data = userDto.userLatestBadgeDto(badge);
  if (!response_data) {
    return null;
  }

  return response_data;
};

const postUserFollowById = async (user_id, followed_user_id) => {
  if (user_id === followed_user_id) {
    throw new userError.CannotFollowSelfError('자기 자신은 팔로우할 수 없습니다.');
  }
  const user_follow = await userRepository.createUserFollows(user_id, followed_user_id);
  const response_data = userDto.userFollowDto(user_follow);
  return response_data;
};

const deleteUserFollowById = async (user_id, unfollowed_user_id) => {
  if (user_id === unfollowed_user_id) {
    throw new userError.CannotFollowSelfError('자기 자신은 언팔로우할 수 없습니다.');
  }
  const user_unfollow = await userRepository.userUnfollows(user_id, unfollowed_user_id);
  const response_data = userDto.userUnfollowDto(user_unfollow);
  return response_data;
};

const getUserBadgesConditionById = async (user_id, badge_id) => {
  const badges_condition = await userRepository.findUserBadgesCondition(user_id, badge_id);
  const response_data = userDto.userBadgesConditionDto(badges_condition);

  return response_data;
};

const getUserLevelById = async id => {
  const level = await userRepository.findUserLevel(id);
  const response_data = userDto.userLevelDto(level);

  return response_data;
};

const getUserVerificationScraps = async user_id => {
  const scrapped_verifications = await userRepository.getUserVerificationScraps(user_id);
  return scrapped_verifications;
};

const getUserVerificationLikes = async user_id => {
  const liked_verifications = await userRepository.getUserVerificationLikes(user_id);
  return liked_verifications;
};

const getFollowerList = async user_id => {
  const followers = await userRepository.getFollowerList(user_id);
  const response = userDto.getFollowerDto(followers);
  return { followers: response };
};

const getFollowingList = async user_id => {
  const followings = await userRepository.getFollowingList(user_id);
  const response = userDto.getFollowingDto(followings);
  return { followings: response };
};

const blockUser = async (user_id, block_user_id) => {
  if (user_id === block_user_id) {
    throw new userError.UserAlreadyBlockedError('Cannot block myself');
  }
  const existingBlock = await userRepository.isUserBlocked(user_id, block_user_id);
  if (existingBlock) {
    throw new userError.UserAlreadyBlockedError('User is already blocked');
  }

  const blockedUser = await userRepository.createBlock(user_id, block_user_id);
  return blockedUser;
};

const unblockUser = async (user_id, unblock_user_id) => {
  if (user_id === unblock_user_id) {
    throw new userError.UserAlreadyBlockedError('Cannot unblock myself');
  }
  const existingBlock = await userRepository.isUserBlocked(user_id, unblock_user_id);
  if (!existingBlock) {
    throw new userError.UserAlreadyBlockedError('User is not blocked');
  }

  const unblockedUser = await userRepository.deleteBlock(user_id, unblock_user_id);
  return unblockedUser;
};

const getBlockedList = async user_id => {
  const blocked_list = await userRepository.getBlockedList(user_id);
  const response = userDto.getBlockedListDto(blocked_list);
  return { blockedList: response };
};

const userQuit = async user_id => {
  const response = await userRepository.userQuit(user_id);
  return response;
};

export default {
  putUserInterestCategoryById,
  getUserInfoById,
  updateUserInfobyId,
  getOngoingChallenge,
  getCompletedChallenge,
  getUserChallengeHistory,
  getUserBadgesById,
  getUserLatestBadgeById,
  postUserFollowById,
  deleteUserFollowById,
  getUserBadgesConditionById,
  getUserLevelById,
  getUserVerificationScraps,
  getUserVerificationLikes,
  getFollowerList,
  getFollowingList,
  blockUser,
  unblockUser,
  getBlockedList,
  userQuit,
};
