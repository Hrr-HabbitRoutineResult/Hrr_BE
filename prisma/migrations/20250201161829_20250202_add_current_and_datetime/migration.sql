/*
  Warnings:

  - Added the required column `updated_at` to the `ChallengeLikes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChallengeLikes` ADD COLUMN `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` DATETIME(6) NOT NULL;

-- AlterTable
ALTER TABLE `Challenges` ADD COLUMN `currentParticipants` INTEGER NULL;
