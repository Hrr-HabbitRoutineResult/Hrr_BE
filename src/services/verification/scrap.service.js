import scrapRepository from '../../repositories/verification/scrap.repository.js';
import scrapError from '../../errors/verification/scrap.error.js';
import scrapDto from '../../dtos/verification/scrap.dto.js';

const scrapVerification = async (user_id, verification_id) => {
  const is_verification_scraped = await scrapRepository.checkVerificationScraped(user_id, verification_id);
  if (is_verification_scraped) {
    throw new scrapError.VerificationAlreadyScrapedError('해당 인증은 이미 스크랩되어 있습니다.');
  }
  const scrap_verification = await scrapRepository.scrapVerification(user_id, verification_id);
  const scrap_verification_response = scrapDto.scrapVerificationServiceToController(scrap_verification);
  return scrap_verification_response;
};

export default {
  scrapVerification,
};
