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

export default {
  serviceToControllerDto,
  updateUserInfoResponseDto,
  updateUserInfoRequestDto,
  userChallengeDto,
};
