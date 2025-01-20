/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `title` to the `Alarms` table without a default value. This is not possible if the table is not empty.
  - Made the column `challengeImage` on table `Challenges` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Alarms` ADD COLUMN `title` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Challenges` ADD COLUMN `endDate` DATETIME(6) NULL,
    ADD COLUMN `joinDate` DATETIME(6) NULL,
    MODIFY `challengeImage` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `name`,
    ADD COLUMN `nickname` VARCHAR(20) NULL DEFAULT '사용자',
    MODIFY `phoneNumber` VARCHAR(15) NULL,
    MODIFY `points` INTEGER NOT NULL DEFAULT 0;
