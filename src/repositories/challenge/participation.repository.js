import { prisma } from '../../db.config.js';

const joinChallenge = async data => {
  try {
    const created_user_challenge = await prisma.userChallenge.create({
      data: data,
    });
    return created_user_challenge;
  } catch (error) {
    throw new authError.DataBaseError('Error on creating email verification');
  }
};

export default {
  joinChallenge,
};
