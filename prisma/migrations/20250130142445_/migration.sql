/*
  Warnings:

  - You are about to drop the column `description` on the `Badges` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Badges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Badges` DROP COLUMN `description`,
    DROP COLUMN `profileImage`;

-- AlterTable
ALTER TABLE `User_Challenge` ADD COLUMN `owner` BOOLEAN NOT NULL DEFAULT false;
