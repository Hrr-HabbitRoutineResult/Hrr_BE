/*
  Warnings:

  - You are about to drop the `Scraps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Scraps`;

-- CreateTable
CREATE TABLE `VerificationScraps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `verification_id` INTEGER NOT NULL,

    UNIQUE INDEX `VerificationScraps_user_id_verification_id_key`(`user_id`, `verification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
