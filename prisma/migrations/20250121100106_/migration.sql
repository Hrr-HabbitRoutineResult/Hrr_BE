-- AlterTable
ALTER TABLE `Boards` MODIFY `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserBoard` MODIFY `pinned` BOOLEAN NOT NULL DEFAULT false;
