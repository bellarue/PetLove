

/* table structure for table user_roles, multivalue attribute of user */

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
    `user` varchar(320) NOT NULL,
    `role` ENUM('Owner', 'Sitter', 'Other') NOT NULL,
    FOREIGN KEY (`user`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`user`, `role`)
);

LOCK TABLES `user_roles` WRITE;

INSERT INTO `user_roles` VALUES ('email@gmail.com', 'Owner'), ('email@gmail.com', 'Sitter');

UNLOCK TABLES;