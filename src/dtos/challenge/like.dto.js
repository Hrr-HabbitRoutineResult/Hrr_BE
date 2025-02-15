const likeChallengeServiceToController = data => {
  const response_data = {
    userId: data[0].user_id,
    verificationId: data[0].verification_id,
    likesCount: data[1].likesCount,
  };
  return response_data;
};
export default { likeChallengeServiceToController };
