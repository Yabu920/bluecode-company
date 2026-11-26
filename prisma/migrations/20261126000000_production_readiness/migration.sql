CREATE TABLE `RateLimit` (
    `id` CHAR(64) NOT NULL,
    `count` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    INDEX `RateLimit_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `ContactMessage`
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `subject` VARCHAR(191) NULL,
    MODIFY `message` TEXT NOT NULL,
    ADD INDEX `ContactMessage_createdAt_id_idx`(`createdAt`, `id`);

ALTER TABLE `Project`
    MODIFY `description` TEXT NOT NULL,
    MODIFY `image` VARCHAR(2048) NULL,
    ADD INDEX `Project_createdAt_id_idx`(`createdAt`, `id`);

ALTER TABLE `Comment`
    MODIFY `body` TEXT NOT NULL,
    ADD INDEX `Comment_projectId_createdAt_idx`(`projectId`, `createdAt`);
