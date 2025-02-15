import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log('🌱 Seeding database...');

    // 1️⃣ Users 생성
    const user1 = await prisma.user.upsert({
      where: { email: 'user1@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        password: 'password123', // 실제 환경에서는 해싱된 비밀번호 사용
        nickname: 'UserOne',
        gender: 'male',
        phoneNumber: '010-1234-5678',
        profilePhoto: 'https://example.com/user1.jpg',
        followerCount: 10,
        followingCount: 5,
      },
    });

    console.log('✅ Users Seeded');

    // 2️⃣ Keywords 생성
    const keywords = ['exercise', 'study', 'hobby', 'diet', 'reading'];
    const keywordRecords = await Promise.all(
      keywords.map(async name =>
        prisma.keyword.upsert({
          where: { name },
          update: {},
          create: { name },
        }),
      ),
    );

    console.log('✅ Keywords Seeded');

    // // 3️⃣ Challenge 생성 (upsert 대신 findFirst + create 사용)
    // let challenge1 = await prisma.challenge.findFirst({
    //   where: { name: '30일 독서 챌린지', owner_id: user1.id },
    // });

    const challenge1 = await prisma.challenge.create({
      data: {
        owner_id: user1.id,
        name: '30일 독서 챌린지',
        type: 'study',
        description: '30일 동안 하루 한 권의 책을 읽는 챌린지입니다.',
        challengeImage: 'https://example.com/reading-challenge.jpg',
        category: 'hobby',
        challengeStatus: 'ongoing',
        maxParticipants: 100,
        verificationType: 'camera',
        rule: '매일 독서 인증 사진을 업로드하세요.',
        joinDate: new Date('2025-01-01T00:00:00.000Z'),
        endDate: new Date('2025-01-30T00:00:00.000Z'),
        duration: 'month_1',
      },
    });
    console.log('✅ Challenge Created');

    // 4️⃣ ChallengeKeyword 관계 설정
    await prisma.challengeKeyword.createMany({
      data: keywordRecords.map(keyword => ({
        challenge_id: challenge1.id, // ✅ 올바른 필드명 사용
        keyword_id: keyword.id, // ✅ 올바른 필드명 사용
      })),
    });

    console.log('✅ Challenge Keywords Seeded');
    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// 실행
seed();
