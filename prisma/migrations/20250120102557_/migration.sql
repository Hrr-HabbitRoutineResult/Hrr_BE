/*
  Warnings:

  - You are about to drop the column `obtain` on the `User_Badge` table. All the data in the column will be lost.
  - You are about to drop the column `userCategory` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Board_Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Challenge_Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isObtained` to the `User_Badge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `User_CategoryType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Alarms` MODIFY `message` VARCHAR(255) NULL,
    MODIFY `title` VARCHAR(120) NOT NULL;

-- AlterTable
ALTER TABLE `Boards` ADD COLUMN `category` ENUM('exercise', 'study', 'hobby', 'jobPreparation', 'lifestyle') NOT NULL,
    MODIFY `name` VARCHAR(40) NOT NULL,
    MODIFY `description` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Challenges` ADD COLUMN `category` ENUM('exercise', 'study', 'hobby', 'jobPreparation', 'lifestyle') NOT NULL,
    MODIFY `name` VARCHAR(40) NULL,
    MODIFY `description` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `FavorType` MODIFY `name` VARCHAR(40) NULL;

-- AlterTable
ALTER TABLE `Keywords` MODIFY `name` VARCHAR(40) NULL;

-- AlterTable
ALTER TABLE `Posts` MODIFY `title` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `TemporaryVerifications` MODIFY `title` VARCHAR(80) NULL,
    MODIFY `content` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `User_Badge` DROP COLUMN `obtain`,
    ADD COLUMN `isObtained` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `User_CategoryType` ADD COLUMN `category` ENUM('exercise', 'study', 'hobby', 'jobPreparation', 'lifestyle') NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `userCategory`,
    ADD COLUMN `category` ENUM('exercise', 'study', 'hobby', 'jobPreparation', 'lifestyle') NOT NULL,
    MODIFY `phoneNumber` VARCHAR(40) NULL,
    MODIFY `nickname` VARCHAR(40) NULL DEFAULT '사용자';

-- AlterTable
ALTER TABLE `Verifications` MODIFY `title` VARCHAR(80) NULL;

-- DropTable
DROP TABLE `Board_Category`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Challenge_Category`;
