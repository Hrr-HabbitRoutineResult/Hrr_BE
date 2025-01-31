const cameraVerificationServiceToController = data => {
  const response_data = {
    message: '챌린지 인증이 완료되었습니다.',
    verification: {
      verificationId: data.id,
      verificationType: data.verificationType,
      title: data.title,
      photoUrl: data.photoUrl,
    },
  };
  return response_data;
};

const textVerificationServiceToController = data => {
  const response_data = {
    message: '챌린지 인증이 완료되었습니다.',
    verification: {
      verificationId: data.id,
      verificationType: data.verificationType,
      title: data.title,
    },
  };
  return response_data;
};

const cameraVerificationServiceToRepositoryDto = (user_id, user_challenge_id, body) => {
  if (!body?.photoUrl) throw new Error('photoUrl is required in body');
  if (!body?.title) throw new Error('title is required in body');
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

const textVerificationServiceToRepositoryDto = (user_id, user_challenge_id, body) => {
  console.log(body);
  if (!body?.title) throw new Error('title is required in body');
  return {
    user_id: user_id,
    userChallenge_id: user_challenge_id,
    title: body.title,
    content: body.content ?? null,
    textUrl: body.textUrl ?? null,
    question: body.question ?? false,
    photoUrl: null,
    verificationType: 'text',
    adoptionComplete: false,
    verificationStatus: 'certified',
  };
};

export default {
  cameraVerificationServiceToController,
  textVerificationServiceToController,
  cameraVerificationServiceToRepositoryDto,
  textVerificationServiceToRepositoryDto,
};
