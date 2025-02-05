/*
  Warnings:

  - You are about to drop the column `deadline` on the `Verifications` table. All the data in the column will be lost.
  - The values [verified,unverified] on the enum `Verifications_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Verifications` DROP COLUMN `deadline`,
    MODIFY `status` ENUM('certified', 'uncertified') NOT NULL;
