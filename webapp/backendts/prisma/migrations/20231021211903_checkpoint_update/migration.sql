/*
  Warnings:

  - Added the required column `city` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumber` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checkpoint` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `houseNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `postCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;
