-- AlterTable
ALTER TABLE `Frequencies` ADD COLUMN `frequencyValue` ENUM('week_1', 'week_2', 'week_3', 'month_1', 'month_3', 'month_6', 'year_1') NULL,
    MODIFY `friday` BOOLEAN NULL DEFAULT false,
    MODIFY `monday` BOOLEAN NULL DEFAULT false,
    MODIFY `saturday` BOOLEAN NULL DEFAULT false,
    MODIFY `sunday` BOOLEAN NULL DEFAULT false,
    MODIFY `thursday` BOOLEAN NULL DEFAULT false,
    MODIFY `tuesday` BOOLEAN NULL DEFAULT false,
    MODIFY `wednesday` BOOLEAN NULL DEFAULT false;
