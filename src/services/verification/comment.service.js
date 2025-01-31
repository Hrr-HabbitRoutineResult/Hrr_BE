import commentRepository from '../../repositories/verification/comment.repository.js';
import commentDto from '../../dtos/verification/comment.dto.js';
import commentError from '../../errors/verification/comment.error.js';

const getVerificationComment = async verification_id => {
  const comments = await commentRepository.getVerificationComment(verification_id);
  return comments;
};

const postVerificationComment = async request_data => {
  const new_comment = await commentRepository.postVerificationComment(request_data);
  const new_comment_response = commentDto.commentVerificationServiceToController(new_comment);
  return new_comment_response;
};

const updateVerificationComment = async (user_id, comment_id, content) => {
  if (!comment_id) {
    throw new commentError.CommentIdError('comment_id is required');
  }
  if (!content || content.trim() === '') {
    throw new commentError.CommentContentEmptyError('Content cannot be empty');
  }
  const comment = await commentRepository.getCommentById(comment_id);
  if (comment.user_id != user_id) {
    throw new commentError.CommentUpdatePermissionDeniedError('Cannot update comment : Permission denied');
  }
  const updated_comment = await commentRepository.updateVerificationComment(comment_id, content);
  return { ...updated_comment, nickname: comment.nickname };
};

export default {
  getVerificationComment,
  postVerificationComment,
  updateVerificationComment,
};
