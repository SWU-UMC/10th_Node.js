/*
  Warnings:

  - You are about to drop the `user_store_review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_store_review` DROP FOREIGN KEY `user_store_review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_store_review` DROP FOREIGN KEY `user_store_review_user_id_fkey`;

-- DropTable
DROP TABLE `user_store_review`;

-- CreateTable
CREATE TABLE `UserStoreReview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `rating` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `storeId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserStoreReview` ADD CONSTRAINT `UserStoreReview_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserStoreReview` ADD CONSTRAINT `UserStoreReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
