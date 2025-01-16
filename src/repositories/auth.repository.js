import authError from '../errors/auth.error.js';
import { prisma } from '../db.config.js';
import logger from '../logger.js';
const findUserPassword = async email => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new authError.userNotExistError('존재하지 않는 이메일입니다.', { email });
  }
  return user.password;
};

export default { findUserPassword };
