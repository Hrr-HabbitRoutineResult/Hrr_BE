import { StatusCodes } from 'http-status-codes';
import scrapService from '../../services/verification/scrap.service.js';

export const scrapVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const verification_id = Number(req.params.verificationId);
    const scrap_verification = await scrapService.scrapVerification(user_id, verification_id);
    return res.status(StatusCodes.OK).json(scrap_verification);
  } catch (error) {
    next(error);
  }
};

export const unscrapVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const verification_id = Number(req.params.verificationId);
    const unscrap_verification = await scrapService.unscrapVerification(user_id, verification_id);
    return res.status(StatusCodes.OK).json(unscrap_verification);
  } catch (error) {
    next(error);
  }
};

export default {
  scrapVerification,
  unscrapVerification,
};
