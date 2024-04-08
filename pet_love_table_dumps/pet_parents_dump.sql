 SET NAMES utf8mb4 ;

/* table structure for table pet_parents */

DROP TABLE IF EXISTS `pet_parents`;
CREATE TABLE `pet_parents` (
    `user` varchar(320) NOT NULL,
    `pet` int(11) NOT NULL,
    FOREIGN KEY (`user`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`pet`) REFERENCES `pets`(`petID`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`user`, `pet`)
);

LOCK TABLES `pet_parents` WRITE;

INSERT INTO `pet_parents` VALUE ('email@gmail.com', 2);

UNLOCK TABLES;