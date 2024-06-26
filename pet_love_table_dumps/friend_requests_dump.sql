
/* table structure for table friendships */

DROP TABLE IF EXISTS `friend_requests`;
CREATE TABLE `friend_requests` (
    `sender` varchar(320),
    `recipient` varchar(320),
    FOREIGN KEY (`sender`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`recipient`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`sender`, `recipient`)
);

LOCK TABLES `friend_requests` WRITE;

INSERT INTO `friend_requests` VALUE ('x@gmail.com', 'email@gmail.com');

UNLOCK TABLES;