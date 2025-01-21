import { prisma } from '../db.config.js';

const getBadgeById = async user_id => {
  const user = await prisma.badge.findUnique({
    where: { id: user_id },
    // select: { userBadge1_id: true, userBadge2_id: true, userBadge3_id: true },
  });
  console.log(user);
  return user;
};

export default {
  getBadgeById,
};
