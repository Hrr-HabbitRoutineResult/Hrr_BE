const serviceToControllerDto = user => {
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
    // badges: user.badges.map(badge => ({
    //   id: badge.id,
    //   name: badge.name,
    //   icon: badge.icon,
    // })),
    // const id = body.id;
    // const name = body.name;
    // const gender = body.gender;
    // const email = body.email;
    // const phone_number = body.phoneNumber;
    // const profile_photo = body.profilePhoto;
    // const level = body.level;
    // const points = body.points;
    // const follower_count = body.followerCount;
    // const following_count = body.followingCount;
    // const badges = body.badges.map(badge => ({
    //   const id = badge.id

    //   icon: badge.icon,
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
