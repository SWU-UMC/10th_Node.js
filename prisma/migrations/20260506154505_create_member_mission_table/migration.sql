/*
  Warnings:

  - You are about to drop the `MemberMission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MemberMission` DROP FOREIGN KEY `MemberMission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `MemberMission` DROP FOREIGN KEY `MemberMission_user_id_fkey`;

-- DropTable
DROP TABLE `MemberMission`;

-- CreateTable
CREATE TABLE `member_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('SUCCESS', 'CHALLENGING') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
