/*
  Warnings:

  - You are about to drop the column `status` on the `UserBoard` table. All the data in the column will be lost.
  - Added the required column `status` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinned` to the `UserBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Boards` ADD COLUMN `status` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `UserBoard` DROP COLUMN `status`,
    ADD COLUMN `pinned` BOOLEAN NOT NULL;
