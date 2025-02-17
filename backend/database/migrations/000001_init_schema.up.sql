DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(200) NOT NULL,
    `content` text NOT NULL,
    `category` varchar(100) NOT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `status` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `posts_chk_1` CHECK ((`status` in (_utf8mb4'publish',_utf8mb4'draft',_utf8mb4'trash')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
