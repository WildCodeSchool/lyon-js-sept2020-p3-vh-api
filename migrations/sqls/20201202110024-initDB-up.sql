CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `encrypted_password` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(25),
  `bio` TEXT,
  `role` VARCHAR(255),
  `photo_url` VARCHAR(255),
  `website_url` VARCHAR(255),
  `facebook_url` VARCHAR(255),
  `twitter_url` VARCHAR(255),
  `instagram_url` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE TABLE `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NOT NULL,
  `zipcode` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE TABLE `event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `price` DECIMAL(13, 2) NOT NULL,
  `description` TEXT,
  `moderator_id` INT NOT NULL,
  `duration_seconds` INT NOT NULL,
  `main_picture_url` VARCHAR(255) NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `event_fk_moderator` FOREIGN KEY (`moderator_id`) REFERENCES `user`(`id`),
  CONSTRAINT `event_fk_id` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE TABLE `order` (
  `user_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `event_id`),
  CONSTRAINT `order_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  CONSTRAINT `order_fk_event` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE TABLE `review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NOT NULL,
  `comment` TEXT NULL,
  `event_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME,
  PRIMARY KEY (`id`, `event_id`, `user_id`),
  CONSTRAINT `review_fk_event` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`),
  CONSTRAINT `review_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;