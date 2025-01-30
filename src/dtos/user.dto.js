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
    // 인증 추가
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

const userChallengeHistoryDto = (user_challenges, verifications) => {
  return user_challenges.map(userChallenge => {
    const verification = verifications.find(v => v.userChallenge_id === userChallenge.id);

    return {
      challenge_id: userChallenge.challenge_id,
      name: userChallenge.challenge.name,
      verification_id: verification ? verification.id : null,
      created_at: verification ? verification.created_at : null,
      title: verification ? verification.title : null,
      photoUrl: verification ? verification.photoUrl : null,
      textUrl: verification ? verification.textUrl : null,
    };
  });
};

export default {
  serviceToControllerDto,
  updateUserInfoResponseDto,
  updateUserInfoRequestDto,
  userChallengeDto,
  userBadgesDto,
  userChallengeHistoryDto,
};
