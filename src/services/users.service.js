import { userRepository } from '../repositories/users.repository.js';
import userDto from '../dtos/user.dto.js';

const getUserInfo = async user_id => {
  //유저 인포 가져오기
  const user_data = userRepository.getUserInfoById(user_id);
  const response_data = userDto.serviceToController(user_data);

  return response_data;
};

const putUserInfo = async user_id => {
  const updated_data = userRepository.putUserInfoById(user_id);
  const response_data = userDto.modifyUserInfoDto(updated_data);

  return response_data;
};

export default {
  getUserInfo,
  putUserInfo,
};
