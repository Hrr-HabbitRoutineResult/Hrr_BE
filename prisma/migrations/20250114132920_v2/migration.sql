/*
  Warnings:

  - You are about to alter the column `gender` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(0))`.
  - You are about to alter the column `level` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(1))`.
  - A unique constraint covering the columns `[follower_id,following_id]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `obtain` to the `User_Badge` table without a default value. This is not possible if the table is not empty.
  - Made the column `warn` on table `User_Challenge` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_userBadge1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_userBadge2_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_userBadge3_id_fkey`;

-- DropIndex
DROP INDEX `Users_userBadge1_id_fkey` ON `Users`;

-- DropIndex
DROP INDEX `Users_userBadge2_id_fkey` ON `Users`;

-- DropIndex
DROP INDEX `Users_userBadge3_id_fkey` ON `Users`;

-- AlterTable
ALTER TABLE `Badges` ADD COLUMN `obtainedCount` INTEGER NULL,
    ADD COLUMN `profileImage` VARCHAR(255) NULL,
    ADD COLUMN `type` ENUM('category', 'type') NULL;

-- AlterTable
ALTER TABLE `User_Badge` ADD COLUMN `obtain` BOOLEAN NOT NULL,
    ADD COLUMN `updated_at` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `User_Challenge` MODIFY `warn` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `ageGroup` ENUM('10s', '20s', '30s', '40s', '50s+') NULL,
    ADD COLUMN `job` ENUM('middleHighSchoolStudent', 'collegeStudent', 'jobSeeker', 'officeWorker', 'housewife') NULL,
    ADD COLUMN `userCategory` ENUM('exercise', 'study', 'hobby', 'jobPreparation', 'lifestyle') NULL,
    MODIFY `userBadge1_id` INTEGER NULL,
    MODIFY `userBadge2_id` INTEGER NULL,
    MODIFY `userBadge3_id` INTEGER NULL,
    MODIFY `gender` ENUM('male', 'female') NULL,
    MODIFY `level` ENUM('bronze', 'silver', 'gold', 'master', 'challenger') NULL;

-- AlterTable
ALTER TABLE `Verifications` ADD COLUMN `deadline` DATETIME(6) NULL;

-- CreateTable
CREATE TABLE `Goals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('health', 'diet', 'foodControl', 'smallGoal', 'studyTogether', 'makeHabit', 'studyRoutine', 'buildCapacity', 'escape_3', 'qualification') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Goal` (
    `user_id` INTEGER NOT NULL,
    `goal_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `goal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alarms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `sender_id` INTEGER NULL,
    `alarmType` ENUM('follow', 'verificationComment', 'postComment', 'warning', 'kickOut', 'newVerification', 'deadline') NOT NULL,
    `reference_id` INTEGER NOT NULL,
    `message` VARCHAR(200) NULL,
    `isRead` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conditions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `badge_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Badge_Condition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userBadge_id` INTEGER NOT NULL,
    `condition_id` INTEGER NOT NULL,
    `isAchieved` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Follows_follower_id_following_id_key` ON `Follows`(`follower_id`, `following_id`);

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_userBadge1_id_fkey` FOREIGN KEY (`userBadge1_id`) REFERENCES `User_Badge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_userBadge2_id_fkey` FOREIGN KEY (`userBadge2_id`) REFERENCES `User_Badge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_userBadge3_id_fkey` FOREIGN KEY (`userBadge3_id`) REFERENCES `User_Badge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Goal` ADD CONSTRAINT `User_Goal_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Goal` ADD CONSTRAINT `User_Goal_goal_id_fkey` FOREIGN KEY (`goal_id`) REFERENCES `Goals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alarms` ADD CONSTRAINT `Alarms_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alarms` ADD CONSTRAINT `Alarms_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `Follows`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conditions` ADD CONSTRAINT `Conditions_badge_id_fkey` FOREIGN KEY (`badge_id`) REFERENCES `Badges`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Badge_Condition` ADD CONSTRAINT `User_Badge_Condition_userBadge_id_fkey` FOREIGN KEY (`userBadge_id`) REFERENCES `User_Badge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Badge_Condition` ADD CONSTRAINT `User_Badge_Condition_condition_id_fkey` FOREIGN KEY (`condition_id`) REFERENCES `Conditions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
