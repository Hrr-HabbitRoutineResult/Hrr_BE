/*
  Warnings:

  - The values [month_2] on the enum `Challenges_duration` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Challenges` ADD COLUMN `likesCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `duration` ENUM('week_1', 'week_2', 'week_3', 'month_1', 'month_3', 'month_6', 'year_1') NOT NULL;
