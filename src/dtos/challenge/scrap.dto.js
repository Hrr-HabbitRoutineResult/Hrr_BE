const scrapChallengeServiceToController = data => {
  const response_data = {
    userId: data[0].user_id,
    challengeId: data[0].challenge_id,
    scrapCount: data[1].scrapsCount,
  };
  return response_data;
};
export default { scrapChallengeServiceToController };
