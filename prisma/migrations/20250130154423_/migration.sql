-- AlterTable
ALTER TABLE `Verifications` ADD COLUMN `likesCount` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `VerificationLikes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `verification_id` INTEGER NOT NULL,

    UNIQUE INDEX `VerificationLikes_user_id_verification_id_key`(`user_id`, `verification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
