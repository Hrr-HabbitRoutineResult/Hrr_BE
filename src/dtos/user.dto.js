const serviceToControllerDto = (user, user_badge_1, user_badge_2, user_badge_3) => {
  const response_data = {
    id: user.id,
    nickname: user.nickname,
    gender: user.gender,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profilePhoto: user.profilePhoto,
    level: user.level,
    points: user.points,
    followerCount: user.followerCount,
    followingCount: user.followingCount,
    user_badge_1: user_badge_1,
    user_badge_2: user_badge_2,
    user_badge_3: user_badge_3,
  };
  return response_data;
};

const updateUserInfoResponseDto = updated_user => {
  const new_info = {
    nickname: updated_user.nickname,
    profilePhoto: updated_user.profilePhoto,
    badges: [updated_user.userBadge1_id, updated_user.userBadge2_id, updated_user.userBadge3_id],
  };
  return new_info;
};

const updateUserInfoRequestDto = body => {
  const new_info = {
    nickname: body.nickname,
    profilePhoto: body.profilePhoto,
    userBadge1: body.badges[0] ? { connect: { id: body.badges[0] } } : undefined,
    userBadge2: body.badges[1] ? { connect: { id: body.badges[1] } } : undefined,
    userBadge3: body.badges[2] ? { connect: { id: body.badges[2] } } : undefined,
  };
  return new_info;
};

const userChallengeDto = challenges => {
  return challenges.map(challenge => ({
    challenge_id: challenge.challenge_id,
    name: challenge.challenge.name,
    challengeImage: challenge.challenge.challengeImage,
    type: challenge.challenge.type,
    description: challenge.challenge.description,
    verificatedToday: challenge.hasVerificationToday,
  }));
};

const userBadgesDto = (type_badges, category_badges) => {
  const formatBadges = badges =>
    badges.map(badge => ({
      badgeId: badge.id,
      name: badge.name,
      icon: badge.icon,
      isObtained: badge.isObtained,
    }));

  return {
    typeBadges: formatBadges(type_badges),
    categoryBadges: formatBadges(category_badges),
  };
};

const userLatestBadgeDto = latest_badge => {
  return {
    badge_id: latest_badge.badge.id,
    name: latest_badge.badge.name,
    icon: latest_badge.badge.icon,
    type: latest_badge.badge.type,
  };
};

const userChallengeHistoryDto = (user_challenges, verifications) => {
  return user_challenges.flatMap(userChallenge => {
    const verification = verifications.filter(v => v.userChallenge_id === userChallenge.id);

    return verification.map(v => ({
      challenge_id: userChallenge.challenge_id,
      name: userChallenge.challenge.name,
      verification_id: v.id,
      created_at: v.created_at,
      title: v.title,
      photoUrl: v.photoUrl,
      textUrl: v.textUrl,
    }));
  });
};

const userFollowDto = followed_user_id => {
  const response_data = {
    message: 'User followed successfully',
    followedUserId: followed_user_id[0].following_id,
  };
  return response_data;
};

const userUnfollowDto = unfollowed_user_id => {
  const response_data = {
    message: 'User unfollowed successfully',
    unfollowedUserId: unfollowed_user_id[0].id,
  };
  return response_data;
};

const userBadgesConditionDto = (condition, status) => {
  return condition.map(condition => ({
    badgeId: condition.condition.badge_id,
    conditionId: condition.condition.id,
    description: condition.condition.description,
    isAchieved: condition.isAchieved,
    isObtained: status?.isObtained ?? null,
  }));
};

const userLevelDto = level => {
  return level.map(level => ({
    level: level.user.level,
    points: level.user.points,
    levelConditionId: level.levelConditionId,
    condition: level.levelCondition.condition,
    isAchieved: level.achieved,
  }));
};

const getFollowerDto = follower => {
  const response = [];

  follower.map(follower => response.push(follower.follower));
  return response;
};

const getFollowingDto = follower => {
  const response = [];

  follower.map(following => response.push(following.following));
  return response;
};

const getBlockedListDto = blocked_list => {
  const response = [];

  blocked_list.map(blocked => response.push(blocked.blocked));
  return response;
};

export default {
  serviceToControllerDto,
  updateUserInfoResponseDto,
  updateUserInfoRequestDto,
  userChallengeDto,
  userBadgesDto,
  userLatestBadgeDto,
  userChallengeHistoryDto,
  userFollowDto,
  userUnfollowDto,
  userBadgesConditionDto,
  userLevelDto,
  getFollowerDto,
  getFollowingDto,
  getBlockedListDto,
};
