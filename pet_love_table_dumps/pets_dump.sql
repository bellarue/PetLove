 SET NAMES utf8mb4 ;

/* table structure for table users */

DROP TABLE IF EXISTS `pets`;
CREATE TABLE `pets` (
    `petID` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `type` varchar(50) NOT NULL,
    `notes` TEXT,
    `veterinarian` varchar(320),
    FOREIGN KEY (`veterinarian`) REFERENCES `veterinarians`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`petID`)
);

LOCK TABLES `pets` WRITE;

INSERT INTO `pets` VALUES (NULL, 'Gus', 'lizard', NULL, 'MJ@gmail.com'), 
INSERT INTO `pets` VALUES (NULL, 'Dave', 'cat', NULL, 'MJ@gmail.com'),
INSERT INTO `pets` VALUES (NULL, 'Walter', 'snake', NULL, 'MJ@gmail.com'),
INSERT INTO `pets` VALUES (NULL, 'Jesse', 'hamster', NULL, 'MJ@gmail.com');


UNLOCK TABLES;