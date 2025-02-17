/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `User_CategoryType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `User_Goal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_CategoryType_user_id_key` ON `User_CategoryType`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_Goal_user_id_key` ON `User_Goal`(`user_id`);
