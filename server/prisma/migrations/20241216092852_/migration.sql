/*
  Warnings:

  - You are about to drop the `UserInterest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `UserInterest`;

-- CreateTable
CREATE TABLE `Interest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `prizeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
