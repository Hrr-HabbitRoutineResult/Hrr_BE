const cameraVerificationBodyToServiceDto = (user_id, challenge_id, body) => {
  if (!body?.photoUrl) throw new Error('photoUrl is required in body');
  if (!body?.title) throw new Error('title is required in body');

  return {
    user_id,
    challenge_id,
    title: body.title,
    content: body.content ?? null,
    text_url: body.textUrl ?? null,
    question: body.question ?? false,
    photo_url: body.photoUrl,
  };
};

export default {
  cameraVerificationBodyToServiceDto,
};
