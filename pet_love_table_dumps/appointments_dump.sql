

/* table structure for table appointments */

DROP TABLE IF EXISTS `appointments`;

CREATE TABLE `appointments` (
    `apptID` int(11) NOT NULL AUTO_INCREMENT,
    `dateTime` datetime NOT NULL,
    `user` varchar(320) NOT NULL,
    `type` varchar(200) NOT NULL,
    `notes` TEXT,
    FOREIGN KEY (`user`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`apptID`)
);

LOCK TABLES `appointments` WRITE;

INSERT INTO `appointments` VALUE (NULL, '2024-03-20', 'email@gmail.com', 'groomer', 'cut nails, hygiene trim');

UNLOCK TABLES;