

/* table structure for table allergies, multivalue attribute of pet */

DROP TABLE IF EXISTS `allergies`;
CREATE TABLE `allergies` (
    `pet` int(11) NOT NULL,
    `allergy` varchar(100) NOT NULL,
    FOREIGN KEY (`pet`) REFERENCES `pets`(`petID`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`pet`, `allergy`)
);

LOCK TABLES `allergies` WRITE;

INSERT INTO `allergies` VALUE (1, 'Eggs'),
(2, 'Fleas'),
(3, 'Wheat'),
(4, 'Soy');


UNLOCK TABLES;