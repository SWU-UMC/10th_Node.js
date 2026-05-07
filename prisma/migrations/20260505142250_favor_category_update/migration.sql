/*
  Warnings:

  - A unique constraint covering the columns `[user_id,food_category_id]` on the table `user_favor_category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_favor_category_user_id_food_category_id_key` ON `user_favor_category`(`user_id`, `food_category_id`);
