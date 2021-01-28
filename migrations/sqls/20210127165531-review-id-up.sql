DROP TABLE `review`;
CREATE TABLE `review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NOT NULL,
  `comment` TEXT NULL,
  `event_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME,
  PRIMARY KEY (`id`),
  CONSTRAINT `review_fk_event` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`),
  CONSTRAINT `review_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;