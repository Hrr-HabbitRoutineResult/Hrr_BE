import { StatusCodes } from 'http-status-codes';
import commentService from '../../services/verification/comment.service.js';
import commentDto from '../../dtos/verification/comment.dto.js';

const getVerificationComments = async (req, res, next) => {
  try {
    const verification_id = Number(req.params.verificationId);
    const comments = await commentService.getVerificationComment(verification_id);
    return res.status(StatusCodes.OK).json(comments);
  } catch (error) {
    next(error);
  }
};
const postVerificationComment = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const verification_id = Number(req.params.verificationId);
    const request_data = commentDto.commentVerificationControllerToService(user_id, verification_id, req.body);
    const new_comment = await commentService.postVerificationComment(request_data);
    return res.status(StatusCodes.OK).json(new_comment);
  } catch (error) {
    next(error);
  }
};
const updateVerificationComment = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const comment_id = Number(req.params.commentId);
    const content = req.body.content;
    const new_comment = await commentService.updateVerificationComment(user_id, comment_id, content);
    return res.status(StatusCodes.OK).json(new_comment);
  } catch (error) {
    next(error);
  }
};

export default {
  getVerificationComments,
  postVerificationComment,
  updateVerificationComment,
};
