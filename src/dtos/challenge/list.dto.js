import { ChallengeStatus } from '@prisma/client';
import moment from 'moment-timezone';

const bodyToChallenge = body => {
  const formatted_JoinDate = moment.tz(body.joinDate, 'YYYY-MM-DD 00:00:00.000000', 'Asia/Seoul');
  const formatted_EndDate = moment.tz(body.endDate, 'YYYY-MM-DD 00:00:00.000000', 'Asia/Seoul');
  return {
    name: body.nickname,
    owner_id: body.owner_id,
    type: body.type,
    description: body.description,
    challengeImage: body.challengeImage,
    category: body.category,
    challengeStatus: body.challengeStatus,
    maxParticipants: body.maxParticipants,
    verificationType: body.verificationType,
    rule: body.rule,
    joinDate: formatted_JoinDate,
    endDate: formatted_EndDate,
  };
};

export default {
  bodyToChallenge,
};
