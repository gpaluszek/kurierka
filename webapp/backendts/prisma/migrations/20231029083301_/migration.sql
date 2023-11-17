/*
  Warnings:

  - You are about to drop the `record` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recordrout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `record` DROP FOREIGN KEY `Record_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `recordrout` DROP FOREIGN KEY `RecordRout_recordId_fkey`;

-- DropTable
DROP TABLE `record`;

-- DropTable
DROP TABLE `recordrout`;

-- DropTable
DROP TABLE `session`;
