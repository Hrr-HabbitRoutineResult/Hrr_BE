import userRepository from '../repositories/users.repository.js';
import userDto from '../dtos/user.dto.js';
import authRepository from '../repositories/auth.repository.js';
import badgeRepository from '../repositories/badge.repository.js';

const getUserInfoByEmail = async email => {
  //유저 인포 가져오기
  const user_data = await authRepository.findUserByEmail(email);

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

const putUserInfo = async user_id => {
  const updated_data = await userRepository.putUserInfoById(user_id);
  const response_data = userDto.modifyUserInfoDto(updated_data);

  return response_data;
};

export default {
  getUserInfoByEmail,
  putUserInfo,
};
