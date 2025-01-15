import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  console.log('Seeding database...');

  // Users Table
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        gender: 'male',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        profilePhoto: 'https://example.com/profile1.jpg',
        level: 'bronze',
        followerCount: 10,
        followingCount: 5,
        points: 100,
        job: 'officeWorker',
        userCategory: 'exercise',
        ageGroup: 'twenty',
      },
      {
        name: 'Jane Smith',
        gender: 'female',
        email: 'jane@example.com',
        phoneNumber: '0987654321',
        password: 'password456',
        profilePhoto: 'https://example.com/profile2.jpg',
        level: 'silver',
        followerCount: 20,
        followingCount: 15,
        points: 200,
        job: 'collegeStudent',
        userCategory: 'study',
        ageGroup: 'thirty',
      },
    ],
  });

  // Keywords Table
  await prisma.keyword.createMany({
    data: [
      { name: 'motivation' },
      { name: 'study' },
      { name: 'health' },
      { name: 'productivity' },
    ],
  });

  // Badges Table
  await prisma.badge.createMany({
    data: [
      {
        name: 'Starter Badge',
        icon: 'https://example.com/badge1.png',
        description: 'Awarded for starting your first challenge',
        type: 'category',
        obtainedCount: 100,
        profileImage: 'https://example.com/badge1_profile.png',
      },
      {
        name: 'Achiever Badge',
        icon: 'https://example.com/badge2.png',
        description: 'Awarded for completing 5 challenges',
        type: 'type',
        obtainedCount: 50,
        profileImage: 'https://example.com/badge2_profile.png',
      },
    ],
  });

  // Challenges Table
  await prisma.challenge.createMany({
    data: [
      {
        owner_id: 1,
        name: '매일 운동',
        type: 'basic',
        description: 'A challenge to exercise daily for 30 minutes',
        challengeImage: 'https://example.com/challenge1.png',
        challengeStatus: 'open',
        maxParticipants: 50,
        verificationType: 'camera',
        rule: 'Submit a photo after exercise',
      },
      {
        owner_id: 2,
        name: '같이 공부',
        type: 'study',
        description: 'Study 2 hours every day for a week',
        challengeImage: 'https://example.com/challenge2.png',
        challengeStatus: 'ongoing',
        maxParticipants: 30,
        verificationType: 'text',
        rule: 'Submit a text summary of what you studied',
      },
    ],
  });

  // Other Tables (Add similar logic for other tables as needed)
  console.log('Database seeded successfully!');
};

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
