/*
  Warnings:

  - You are about to drop the column `name` on the `Level_Condition` table. All the data in the column will be lost.
  - Added the required column `level` to the `Level_Condition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChallengeLikes` ADD COLUMN `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `Challenges` ADD COLUMN `currentParticipants` INTEGER NULL,
    MODIFY `duration` ENUM('week_1', 'week_2', 'week_3', 'month_1', 'month_3', 'month_6', 'year_1') NULL;

-- AlterTable
ALTER TABLE `Frequencies` ADD COLUMN `frequencyValue` ENUM('everyday', 'week_2', 'week_3', 'week_5', 'weekdays', 'weekends') NULL,
    MODIFY `friday` BOOLEAN NULL DEFAULT false,
    MODIFY `monday` BOOLEAN NULL DEFAULT false,
    MODIFY `saturday` BOOLEAN NULL DEFAULT false,
    MODIFY `sunday` BOOLEAN NULL DEFAULT false,
    MODIFY `thursday` BOOLEAN NULL DEFAULT false,
    MODIFY `tuesday` BOOLEAN NULL DEFAULT false,
    MODIFY `wednesday` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Level_Condition` DROP COLUMN `name`,
    ADD COLUMN `level` ENUM('general', 'bronze', 'silver', 'gold', 'master', 'challenger') NOT NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `level` ENUM('general', 'bronze', 'silver', 'gold', 'master', 'challenger') NULL;
