DROP TABLE `order`;
CREATE TABLE `order` (
  `order_id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`order_id`,`user_id`, `event_id`),
  CONSTRAINT `order_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  CONSTRAINT `order_fk_event` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;