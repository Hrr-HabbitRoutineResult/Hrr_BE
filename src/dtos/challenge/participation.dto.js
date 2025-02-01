const joinChallengeRequest = (user_id, challenge_id, challenge_status, challenge_start_date, challenge_end_date) => {
  const data = {
    user_id: user_id,
    challenge_id: challenge_id,
    challengeStatus: challenge_status,
    joinDate: challenge_start_date,
    endDate: challenge_end_date,
  };
  return data;
};

const userVerificationDto = verifications => {
  // User 정보
  const user_info = {
    id: verifications.user_info.id,
    name: verifications.user_info.nickname,
    profilePhoto: verifications.user_info.profilePhoto,
  };

  // 달성률 계산
  const join_date = new Date(verifications.achievement_rate.joinDate);
  const end_date = new Date(verifications.achievement_rate.endDate);
  const now = new Date();

  const total_days = Math.ceil((end_date - join_date) / (1000 * 60 * 60 * 24));
  const elapsed_days = Math.ceil((now - join_date) / (1000 * 60 * 60 * 24));
  const progress = total_days > 0 ? Math.min((elapsed_days / total_days) * 100, 100) : 0;

  // 인증 현황
  const verifications_info = {
    verifyCount: verifications.user_challenge.verifyCount,
    warnCount: verifications.user_challenge.warn,
    achievement_rate: Math.round(progress),
  };

  // 인증 리스트 변환
  const verification_list = verifications.verifications.map(v => ({
    verificationId: v.id,
    type: v.type,
    created_at: v.created_at.toISOString().split('T')[0], // 날짜만 추출
    photoUrl: v.photoUrl || null,
    textUrl: v.textUrl || null,
    title: v.title,
  }));

  return {
    UserInfo: user_info,
    Verifications: verifications_info,
    VerificationList: verification_list,
  };
};

export default {
  joinChallengeRequest,
  userVerificationDto,
};
