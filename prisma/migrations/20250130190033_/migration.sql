-- AlterTable
ALTER TABLE `Verifications` ADD COLUMN `commentsCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `scrapsCount` INTEGER NOT NULL DEFAULT 0;
