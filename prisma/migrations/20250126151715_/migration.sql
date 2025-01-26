/*
  Warnings:

  - You are about to drop the column `frequencyValue` on the `Frequencies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `anonymous` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `parent_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Frequencies` DROP COLUMN `frequencyValue`,
    ADD COLUMN `friday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `monday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `saturday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sunday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `thursday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tuesday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `wednesday` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Verifications` ADD COLUMN `adoptionComplete` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `UserAgreements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `agreeAll` BOOLEAN NOT NULL DEFAULT false,
    `termsOfService` BOOLEAN NOT NULL DEFAULT false,
    `privacyPolicy` BOOLEAN NOT NULL DEFAULT false,
    `thirdPartyProvision` BOOLEAN NOT NULL DEFAULT false,
    `marketingAndAds` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
