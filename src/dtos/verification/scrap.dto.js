const scrapVerificationServiceToController = data => {
  const response_data = {
    userId: data[0].user_id,
    verificationId: data[0].verification_id,
    scrapCount: data[1].scrapsCount,
  };
  return response_data;
};
export default { scrapVerificationServiceToController };
