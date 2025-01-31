import commentRepository from '../../repositories/verification/comment.repository.js';
import commentDto from '../../dtos/verification/comment.dto.js';

const getVerificationComment = async verification_id => {
  const comments = await commentRepository.getVerificationComment(verification_id);
  return comments;
};

const postVerificationComment = async request_data => {
  const new_comment = await commentRepository.postVerificationComment(request_data);
  const new_comment_response = commentDto.commentVerificationServiceToController(new_comment);
  return new_comment_response;
};

export default {
  getVerificationComment,
  postVerificationComment,
};
