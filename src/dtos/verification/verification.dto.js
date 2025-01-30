const cameraVerificationBodyToServiceDto = (user_id, challenge_id, body) => {};

const cameraVerificationServiceToRepositoryDto = (user_id, user_challenge_id, body) => {
  console.log(body);
  if (!body?.photoUrl) throw new Error('photoUrl is required in body');
  if (!body?.title) throw new Error('title is required in body');
  if (!body?.photoUrl) throw new Error('title is required in body');
  return {
    user_id: user_id,
    userChallenge_id: user_challenge_id,
    title: body.title,
    content: body.content ?? null,
    textUrl: body.textUrl ?? null,
    question: body.question ?? false,
    photoUrl: body.photoUrl,
    verificationType: 'camera',
    adoptionComplete: false,
    verificationStatus: 'certified',
  };
};

export default {
  cameraVerificationBodyToServiceDto,
  cameraVerificationServiceToRepositoryDto,
};
