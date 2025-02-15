/*
  Warnings:

  - You are about to drop the column `name` on the `Level_Condition` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Keywords` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `Level_Condition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Level_Condition` DROP COLUMN `name`,
    ADD COLUMN `level` ENUM('general', 'bronze', 'silver', 'gold', 'master', 'challenger') NOT NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `level` ENUM('general', 'bronze', 'silver', 'gold', 'master', 'challenger') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Keywords_name_key` ON `Keywords`(`name`);
