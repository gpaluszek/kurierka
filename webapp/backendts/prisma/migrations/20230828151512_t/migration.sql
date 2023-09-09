/*
  Warnings:

  - You are about to drop the `_checkpointtotrail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_checkpointtotrail` DROP FOREIGN KEY `_CheckpointToTrail_A_fkey`;

-- DropForeignKey
ALTER TABLE `_checkpointtotrail` DROP FOREIGN KEY `_CheckpointToTrail_B_fkey`;

-- DropTable
DROP TABLE `_checkpointtotrail`;
