import { prisma } from '../db.config.js';
import authError from '../errors/auth.error.js';

const getUserInfoById = async user_id => {
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    include: {
      badges: true,
    },
  });
  console.log(user);
  return user;
};

const putUserInfoById = async user_id => {
  try {
    const updated_user = await prisma.user.update({
      where: { id: user_id },
      data: { nickname, profile_photo, badges },
    });
    return updated_user;
  } catch (error) {
    throw new authError.DataBaseError('Error on modifying user information');
  }
};

export default {
  getUserInfoById,
  putUserInfoById,
};
