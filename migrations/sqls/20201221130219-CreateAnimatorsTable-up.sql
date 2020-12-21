/* Replace with your SQL commands */

CREATE TABLE `animators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `biographie` TEXT NOT NULL,
  `facebook_url` VARCHAR(255),
  `twitter_url` VARCHAR(255),
  `instagram_url` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;