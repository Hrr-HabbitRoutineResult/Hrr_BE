const scrapVerificationServiceToController = data => {
  const response_data = {
    user_id: data[0].user_id,
    verification_id: data[0].verification_id,
    scrapsCount: data[1].scrapsCount,
  };
  return response_data;
};
export default { scrapVerificationServiceToController };
