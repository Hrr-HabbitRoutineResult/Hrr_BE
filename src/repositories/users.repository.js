import { prisma } from '../db.config.js';
import authError from '../errors/auth.error.js';

const getUserInfoById = async user_id => {
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    include: {
      badges: true,
    },
  });
  return user;
};

const updateUserInfo = async (email, update_data) => {
  try {
    const updated_user = await prisma.user.update({
      where: { email: email },
      data: update_data,
    });
    return updated_user;
  } catch (error) {
    throw new authError.DataBaseError('Error on modifying user information');
  }
};

export default {
  getUserInfoById,
  updateUserInfo,
};
