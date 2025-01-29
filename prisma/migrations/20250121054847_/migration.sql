/*
  Warnings:

  - You are about to drop the column `status` on the `Boards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Boards` DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `UserBoard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `boardId` INTEGER NOT NULL,
    `status` ENUM('basic', 'pinned', 'default') NOT NULL,

    UNIQUE INDEX `UserBoard_userId_boardId_key`(`userId`, `boardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
