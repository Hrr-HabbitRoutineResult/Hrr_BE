/*
  Warnings:

  - Added the required column `duration` to the `Challenges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Challenges` ADD COLUMN `duration` ENUM('week_1', 'week_2', 'week_3', 'month_1', 'month_2', 'month_3') NOT NULL;

-- AlterTable
ALTER TABLE `User_Challenge` MODIFY `status` ENUM('kick', 'active') NOT NULL DEFAULT 'active';
