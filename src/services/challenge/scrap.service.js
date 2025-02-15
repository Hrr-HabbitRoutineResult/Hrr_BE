import scrapRepository from '../../repositories/challenge/scrap.repository.js';
import scrapError from '../../errors/verification/scrap.error.js';
import scrapDto from '../../dtos/challenge/scrap.dto.js';

const scrapChallenge = async (user_id, challenge_id) => {
  const is_challenge_scraped = await scrapRepository.checkChallengeScraped(user_id, challenge_id);
  if (is_challenge_scraped) {
    throw new scrapError.ChallengeAlreadyScrapedError('해당 챌린지는 이미 스크랩되어 있습니다.');
  }
  const scrap_challenge = await scrapRepository.scrapChallenge(user_id, challenge_id);
  const scrap_challenge_response = scrapDto.scrapChallengeServiceToController(scrap_challenge);
  return scrap_challenge_response;
};

const unscrapChallenge = async (user_id, challenge_id) => {
  const is_challenge_scraped = await scrapRepository.checkChallengeScraped(user_id, challenge_id);
  if (!is_challenge_scraped) {
    throw new scrapError.ChallengeNotScrapedError('해당 챌린지는 이미 스크랩되어 있습니다.');
  }
  const unscrap_challenge = await scrapRepository.unscrapChallenge(user_id, challenge_id);
  const unscrap_challenge_response = scrapDto.scrapChallengeServiceToController(unscrap_challenge);
  return unscrap_challenge_response;
};

export default {
  scrapChallenge,
  unscrapChallenge,
};
