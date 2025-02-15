import { StatusCodes } from 'http-status-codes';
import scrapService from '../../services/challenge/scrap.service.js';

export const scrapChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = Number(req.params.challengeId);
    const scrap_challenge = await scrapService.scrapChallenge(user_id, challenge_id);
    return res.success(scrap_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const unscrapChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = Number(req.params.challengeId);
    const unscrap_challenge = await scrapService.unscrapChallenge(user_id, challenge_id);
    return res.success(unscrap_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  scrapChallenge,
  unscrapChallenge,
};
