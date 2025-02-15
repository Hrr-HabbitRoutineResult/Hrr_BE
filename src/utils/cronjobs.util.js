// cronJobs.js
import cron from 'node-cron';
import logger from '../logger.js';
import authRepository from '../repositories/auth.repository.js';
import categoryService from '../services/challenge/category.service.js';

const startCronJobs = () => {
  // 매일 자정에 만료된 인증 코드 삭제
  cron.schedule('0 0 * * *', async () => {
    logger.Info('Deleting expired verification codes...');
    await authRepository.deleteExpiredEmailVerifications();
  });

  cron.schedule('0 0 * * *', async () => {
    logger.info('Updating daily hot challenges...');
    try {
      await categoryService.getDailyHotChallenge();
      logger.info('Daily hot challenges updated successfully!');
    } catch (error) {
      logger.error('Error updating daily hot challenges:', error.message);
    }
  });
};

export default { startCronJobs };
