/*
  Warnings:

  - A unique constraint covering the columns `[user_id,challenge_id]` on the table `ChallengeScraps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ChallengeScraps_user_id_challenge_id_key` ON `ChallengeScraps`(`user_id`, `challenge_id`);
