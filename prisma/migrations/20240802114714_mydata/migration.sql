/*
  Warnings:

  - You are about to drop the column `createAt` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Question` table. All the data in the column will be lost.
  - Added the required column `likes` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `createAt`,
    DROP COLUMN `like`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `likes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `like`,
    ADD COLUMN `likes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `phone` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_authorIdx_fkey` FOREIGN KEY (`authorIdx`) REFERENCES `User`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_questionIdx_fkey` FOREIGN KEY (`questionIdx`) REFERENCES `Question`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;
