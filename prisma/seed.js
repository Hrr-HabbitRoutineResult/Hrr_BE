import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Keywords
  const keyword1 = await prisma.keyword.create({ data: { name: 'Health' } });
  const keyword2 = await prisma.keyword.create({ data: { name: 'Fitness' } });

  // 2. Create Categories
  const category1 = await prisma.category.create({ data: { name: 'Education' } });
  const category2 = await prisma.category.create({ data: { name: 'Wellness' } });

  // 3. Create Badges
  const badge1 = await prisma.badge.create({
    data: { name: 'Achiever', icon: '🏆', description: 'Completed 10 challenges' },
  });
  const badge2 = await prisma.badge.create({
    data: { name: 'Beginner', icon: '🔰', description: 'First Challenge Joined' },
  });

  // 4. Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      gender: 'Female',
      email: 'alice@example.com',
      phoneNumber: '1234567890',
      password: 'securepassword',
      created_at: new Date(),
      updated_at: new Date(),
      inactiveDate: new Date(),
      profilePhoto: 'https://example.com/photo.jpg',
      level: 1,
      followerCount: 100,
      followingCount: 50,
      points: 1500,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      gender: 'Male',
      email: 'bob@example.com',
      phoneNumber: '9876543210',
      password: 'securepassword',
      created_at: new Date(),
      updated_at: new Date(),
      inactiveDate: new Date(),
      profilePhoto: 'https://example.com/photo2.jpg',
      level: 2,
      followerCount: 200,
      followingCount: 100,
      points: 3000,
    },
  });

  // 5. Create UserBadges
  await prisma.userBadge.create({
    data: { user_id: user1.id, badge_id: badge1.id, created_at: new Date() },
  });

  // 6. Create Boards
  const board = await prisma.board.create({
    data: {
      name: 'Announcements',
      description: 'General announcements for everyone',
      boardStatus: 'pinned',
    },
  });

  // 7. Create Posts
  const post1 = await prisma.post.create({
    data: {
      user_id: user1.id,
      board_id: board.id,
      title: 'Welcome to the Board!',
      content: 'Feel free to share your thoughts here.',
      anonymous: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // 8. Create Comments
  await prisma.comment.create({
    data: {
      user_id: user2.id,
      post_id: post1.id,
      verification_id: 1,
      content: 'Thank you for creating this board!',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // 9. Create PostLikes
  await prisma.postLike.create({ data: { user_id: user2.id, post_id: post1.id } });

  // 10. Create Follows
  await prisma.follow.create({ data: { follower_id: user1.id, following_id: user2.id } });

  // 11. Create Messages
  await prisma.message.create({
    data: {
      sendUser_id: user1.id,
      receivedUser_id: user2.id,
      content: 'Hello Bob!',
      created_at: new Date(),
    },
  });

  // 12. Create Challenges
  const challenge = await prisma.challenge.create({
    data: {
      owner_id: user1.id,
      name: '30-Day Fitness',
      type: 'basic',
      description: 'Join this challenge to stay fit.',
      challengeImage: 'https://example.com/image.jpg',
      challengeStatus: 'open',
      maxParticipants: 100,
      verificationType: 'camera',
      rule: 'Post a photo every day.',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // 13. Create ChallengeLikes
  await prisma.challengeLike.create({ data: { user_id: user2.id, challenge_id: challenge.id } });

  // 14. Create Frequencies
  await prisma.frequency.create({
    data: {
      challenge_id: challenge.id,
      frequencyType: 'weeklyCount',
      frequencyValue: { count: 3 },
    },
  });

  // 15. Create UserChallenges
  const userChallenge = await prisma.userChallenge.create({
    data: {
      challenge_id: challenge.id,
      user_id: user1.id,
      challengeStatus: 'open',
      joinDate: new Date(),
      endDate: null,
      verifyCount: 0,
      unverifiedCount: 0,
      userChallengeStatus: 'active',
      warn: 0,
    },
  });

  // 16. Create Verifications
  await prisma.verification.create({
    data: {
      user_id: user1.id,
      userChallenge_id: userChallenge.id,
      challengeType: 'basic',
      verificationType: 'camera',
      photoUrl: 'https://example.com/verification.jpg',
      title: 'Day 1 Proof',
      content: 'Here is my workout photo for day 1.',
      verificationStatus: 'verified',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // 17. Create Scraps
  await prisma.scrap.create({
    data: {
      user_id: user1.id,
      scrapTarget1_id: 1,
      scrapTarget2_id: 234,
      scrapType: 'verification',
      created_at: new Date(),
    },
  });

  // 18. Create TemporaryVerifications
  await prisma.temporaryVerification.create({
    data: {
      user_id: user2.id,
      verification_id: 1,
      challengeType: 'basic',
      title: 'Temporary Proof',
      content: 'Temporary content example',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log('🌱 Database has been seeded.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
