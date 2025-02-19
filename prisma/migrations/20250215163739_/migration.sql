/*
  Warnings:

  - The primary key for the `User_CategoryType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `User_CategoryType` table. All the data in the column will be lost.
  - You are about to drop the column `favorType_id` on the `User_CategoryType` table. All the data in the column will be lost.
  - The primary key for the `User_Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `goal_id` on the `User_Goal` table. All the data in the column will be lost.
  - You are about to drop the `Goals` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `User_CategoryType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `User_Goal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `User_Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User_CategoryType` DROP PRIMARY KEY,
    DROP COLUMN `category_id`,
    DROP COLUMN `favorType_id`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `category` ENUM('exercise', 'study', 'hobby', 'jobPreparation', 'lifestyle') NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User_Goal` DROP PRIMARY KEY,
    DROP COLUMN `goal_id`,
    ADD COLUMN `category` ENUM('exercise', 'study', 'hobby', 'jobPreparation', 'lifestyle') NULL,
    ADD COLUMN `goal` ENUM('건강', '다이어트', '식단조절', '소소한목표달성', '여럿이공부하기', '습관형성', '공부루틴형성', '역량강화', '작심삼일탈출', '자격증취득') NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Goals`;

-- CreateIndex
CREATE UNIQUE INDEX `User_CategoryType_user_id_key` ON `User_CategoryType`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_Goal_user_id_key` ON `User_Goal`(`user_id`);
