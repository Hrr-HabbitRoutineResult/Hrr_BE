import commentError from '../../errors/verification/comment.error.js';

const commentVerificationControllerToService = (user_id, verification_id, body) => {
  if (!body.content) {
    throw new commentError.CommentContentEmtpyError('댓글 내용이 비어있습니다.');
  }
  if (!verification_id) {
    throw new commentError.CommentTypeError('인증 아이디가 누락되었습니다.');
  }
  const data = {
    user_id: user_id,
    verification_id: verification_id,
    parent_id: body.parentId ?? null,
    anonymous: body.annonymous ?? false,
    content: body.content,
  };
  return data;
};

const commentVerificationServiceToController = new_comment => {
  const response_data = {
    commentId: new_comment[0].id,
    userId: new_comment[0].user_id,
    verificationId: new_comment[0].verification_id,
    parentId: new_comment[0].parent_id,
    createdAt: new_comment[0].created_at,
    content: new_comment[0].content,
  };
  return response_data;
};

export default {
  commentVerificationControllerToService,
  commentVerificationServiceToController,
};
