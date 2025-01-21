const serviceToControllerDto = (user, user_badge_1, user_badge_2, user_badge_3) => {
  const response_data = {
    id: user.id,
    name: user.nickname,
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
  console.log(user, response_data);
  return response_data;
};

const modifyUserInfoDto = updated_user => {
  const new_info = {
    name: updated_user.nickname,
    profilePhoto: updated_user.profile_photo,
    badges: updated_user.badges,
  };

  return new_info;
};

export default {
  serviceToControllerDto,
  modifyUserInfoDto,
};
