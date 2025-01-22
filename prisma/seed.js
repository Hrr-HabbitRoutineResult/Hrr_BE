import {
  PrismaClient,
  Gender,
  Level,
  Job,
  AgeGroup,
  Category,
  VerificationType,
  VerificationStatus,
  ChallengeType,
  ChallengeStatus,
  AlarmType,
  BadgeType,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기본 사용자 추가
  const user1 = await prisma.user.create({
    data: {
      nickname: '사용자1',
      gender: Gender.male,
      email: 'user1@example.com',
      phoneNumber: '010-1234-5678',
      password: 'password123',
      followerCount: 10,
      followingCount: 5,
      points: 100,
      job: Job.collegeStudent,
      category: Category.study,
      ageGroup: AgeGroup.twenty,
      level: Level.silver,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      nickname: '사용자2',
      gender: Gender.female,
      email: 'user2@example.com',
      phoneNumber: '010-9876-5432',
      password: 'password456',
      followerCount: 15,
      followingCount: 10,
      points: 200,
      job: Job.officeWorker,
      category: Category.exercise,
      ageGroup: AgeGroup.thirty,
      level: Level.gold,
    },
  });

  // 배지 추가
  const badge1 = await prisma.badge.create({
    data: {
      name: '최고의 사용자',
      type: BadgeType.category,
      obtainedCount: 50,
    },
  });

  const badge2 = await prisma.badge.create({
    data: {
      name: '우수 참여자',
      type: BadgeType.type,
      obtainedCount: 30,
    },
  });

  // 사용자 배지 추가
  await prisma.userBadge.create({
    data: {
      user_id: user1.id,
      badge_id: badge1.id,
      isObtained: true,
    },
  });

  await prisma.userBadge.create({
    data: {
      user_id: user2.id,
      badge_id: badge2.id,
      isObtained: true,
    },
  });

  // 챌린지 추가
  const challenge = await prisma.challenge.create({
    data: {
      owner_id: user1.id,
      name: '코딩 마스터 챌린지',
      type: ChallengeType.study,
      challengeImage: 'https://example.com/challenge-image.jpg',
      challengeStatus: ChallengeStatus.ongoing,
      verificationType: VerificationType.camera,
      rule: '주어진 문제를 풀고 제출하세요.',
      joinDate: new Date(),
      endDate: new Date('2025-12-31'),
      category: Category.study,
    },
  });

  // 알람 추가
  await prisma.alarm.create({
    data: {
      user_id: user1.id,
      alarmType: AlarmType.follow,
      title: '새로운 팔로워',
      message: '사용자2님이 당신을 팔로우했습니다.',
      referenceId, //동적으로 설정된 referenceId는 NOT NULL로 들어갑니다.
    },
  });

  // 검증 추가
  const verification = await prisma.verification.create({
    data: {
      user_id: user1.id,
      userChallenge_id: challenge.id,
      challengeType: ChallengeType.study,
      verificationType: VerificationType.text,
      verificationStatus: VerificationStatus.unverified,
      title: '코딩 문제 검증',
      content: '주어진 코딩 문제를 풀었습니다.',
      created_at: new Date(),
      updated_at: new Date(),
      deadline: new Date('2025-12-31'),
    },
  });

  // 키워드 추가
  const keyword = await prisma.keyword.create({
    data: {
      name: 'JavaScript',
    },
  });

  // 챌린지와 키워드 연결
  await prisma.challengeKeyword.create({
    data: {
      challenge_id: challenge.id,
      keyword_id: keyword.id,
    },
  });

  console.log('데이터 seeding 완료');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
