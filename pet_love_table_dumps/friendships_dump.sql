

/* table structure for table friendships */

DROP TABLE IF EXISTS `friendships`;
CREATE TABLE `friendships` (
    `user` varchar(320),
    `friend` varchar(320),
    FOREIGN KEY (`user`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`friend`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`user`, `friend`)
);

LOCK TABLES `friendships` WRITE;

INSERT INTO `friendships` VALUES ('email@gmail.com', 'ahhh@gmail.com'), ('ahhh@gmail.com', 'email@gmail.com');

UNLOCK TABLES;