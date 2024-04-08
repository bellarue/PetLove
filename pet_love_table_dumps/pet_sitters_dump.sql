

/* table structure for table pet_sitters */

DROP TABLE IF EXISTS `pet_sitters`;
CREATE TABLE `pet_sitters` (
    `user` varchar(320) NOT NULL,
    `pet` int(11) NOT NULL,
    FOREIGN KEY (`user`) REFERENCES users(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`pet`) REFERENCES pets(`petID`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`user`, `pet`)
);

LOCK TABLES `pet_sitters` WRITE;

INSERT INTO `pet_sitters` VALUE ('email@gmail.com', 1);

UNLOCK TABLES;