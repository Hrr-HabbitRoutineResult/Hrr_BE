import { prisma } from '../db.config.js';

const getBadgeById = async user_id => {
  const user = await prisma.badge.findUnique({
    where: { id: user_id },
  });
  return user;
};

export default {
  getBadgeById,
};
