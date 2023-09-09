-- CreateTable
CREATE TABLE `CheckpointToTrail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkpointId` INTEGER NOT NULL,
    `trailId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CheckpointToTrail` ADD CONSTRAINT `CheckpointToTrail_checkpointId_fkey` FOREIGN KEY (`checkpointId`) REFERENCES `Checkpoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckpointToTrail` ADD CONSTRAINT `CheckpointToTrail_trailId_fkey` FOREIGN KEY (`trailId`) REFERENCES `Trail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
