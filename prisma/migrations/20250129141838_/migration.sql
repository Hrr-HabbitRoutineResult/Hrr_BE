/*
  Warnings:

  - You are about to drop the column `status` on the `Verifications` table. All the data in the column will be lost.
  - Added the required column `VerificationStatus` to the `Verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Verifications` DROP COLUMN `status`,
    ADD COLUMN `VerificationStatus` ENUM('certified', 'uncertified') NOT NULL;
