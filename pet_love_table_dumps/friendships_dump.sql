

/* table structure for table friendships */

DROP TABLE IF EXISTS `friendships`;
CREATE TABLE `friendships` (
    `user1` varchar(320),
    `user2` varchar(320),
    FOREIGN KEY (`user1`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`user2`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`user1`, `user2`)
);

LOCK TABLES `friendships` WRITE;

INSERT INTO `friendships` VALUE ('email@gmail.com', 'ahhh@gmail.com');

UNLOCK TABLES;