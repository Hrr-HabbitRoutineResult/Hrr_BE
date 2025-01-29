import userRepository from '../repositories/users.repository.js';
import userDto from '../dtos/user.dto.js';
import authRepository from '../repositories/auth.repository.js';
import badgeRepository from '../repositories/badge.repository.js';
import userError from '../errors/users.error.js';
import authError from '../errors/auth.error.js';
import { Prisma } from '@prisma/client';

const getUserInfoByEmail = async email => {
  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'U001') {
        // 사용자가 없을 경우
        throw new authError.UserNotExistError('해당 유저를 찾을 수 없습니다.');
      }
    } // 다른 Prisma 관련 에러 처리
    else {
      throw new userError.DataBaseError('DataBase Error on updating user information');
    }
  }
};

const updateUserInfobyEmail = async (email, update_data) => {
  try {
    const updated_data = await userRepository.updateUserInfo(email, update_data);
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
      throw new userError.DataBaseError('DataBase Error on updating user information');
    }
  }
};

const getOngoingChallenge = async id => {
  const ongoing_challenges = await userRepository.findOngoingChallenges(id);
  const response_data = userDto.userChallengeDto(ongoing_challenges);
  if (!response_data) {
    return null;
  }
  return response_data;
};

const getCompletedChallenge = async id => {
  const completed_challenges = await userRepository.findCompletedChallenges(id);
  const response_data = userDto.userChallengeDto(completed_challenges);
  if (!response_data) {
    return null;
  }

  return response_data;
};

export default {
  getUserInfoByEmail,
  updateUserInfobyEmail,
  getOngoingChallenge,
  getCompletedChallenge,
};
