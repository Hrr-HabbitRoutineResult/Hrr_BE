import { ChallengeStatus } from '@prisma/client';
import moment from 'moment-timezone';

const bodyToChallenge = body => {
  const formatted_JoinDate = body.joinDate ? moment.tz(body.joinDate, 'Asia/Seoul').toDate() : null;
  const formatted_EndDate = body.endDate ? moment.tz(body.endDate, 'Asia/Seoul').toDate() : null;

  const data = {
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
    duration: body.duration,
  };

  const keywords = body.keywords;

  const frequencyData = {
    frequencyType: body.frequencyType || null,
    frequencyValue: body.frequencyValue || null,
    monday: body.days?.includes('월') || false,
    tuesday: body.days?.includes('화') || false,
    wednesday: body.days?.includes('수') || false,
    thursday: body.days?.includes('목') || false,
    friday: body.days?.includes('금') || false,
    saturday: body.days?.includes('토') || false,
    sunday: body.days?.includes('일') || false,
  };

  return { data, keywords, frequencyData };
};

export default {
  bodyToChallenge,
};
