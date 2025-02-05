const likeVerificationServiceToController = data => {
  const response_data = {
    user_id: data[0].user_id,
    verification_id: data[0].verification_id,
    likesCount: data[1].likesCount,
  };
  return response_data;
};
export default { likeVerificationServiceToController };
