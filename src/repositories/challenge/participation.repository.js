import { prisma } from '../../db.config.js';
import authError from '../../errors/auth.error.js';

const joinChallenge = async data => {
  try {
    const created_user_challenge = await prisma.userChallenge.create({
      data: data,
    });
    return created_user_challenge;
  } catch (error) {
    console.log(error);
    throw new authError.DataBaseError('Error on creating email verification');
  }
};

export default {
  joinChallenge,
};
