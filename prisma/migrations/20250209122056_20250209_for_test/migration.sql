-- AlterTable
ALTER TABLE `ChallengeLikes` MODIFY `updated_at` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `Challenges` MODIFY `duration` ENUM('week_1', 'week_2', 'week_3', 'month_1', 'month_3', 'month_6', 'year_1') NULL;
