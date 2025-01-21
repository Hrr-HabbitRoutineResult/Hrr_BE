const joinChallengeRequest = (user_id, challenge_id, challenge_status, challenge_start_date, challenge_end_date) => {
  const data = {
    userId: user_id,
    challengeId: challenge_id,
    challengeStatus: challenge_status,
    startDate: challenge_start_date,
    endDate: challenge_end_date,
  };
  return data;
};

export default { joinChallengeRequest };
