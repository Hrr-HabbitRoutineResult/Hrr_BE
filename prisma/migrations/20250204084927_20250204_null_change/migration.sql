/*
  Warnings:

  - The values [week_1,month_1,month_3,month_6,year_1] on the enum `Frequencies_frequencyValue` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Frequencies` MODIFY `frequencyValue` ENUM('everyday', 'week_2', 'week_3', 'week_5', 'weekdays', 'weekends') NULL;
