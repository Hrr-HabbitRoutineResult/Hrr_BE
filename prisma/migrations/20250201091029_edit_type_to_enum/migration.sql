-- AlterTable
ALTER TABLE `Level_Condition` MODIFY `level` ENUM('general', 'bronze', 'silver', 'gold', 'master', 'challenger') NOT NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `level` ENUM('general', 'bronze', 'silver', 'gold', 'master', 'challenger') NULL;
