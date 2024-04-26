

/* table structure for table mealtimes */

DROP TABLE IF EXISTS `mealtimes`;
CREATE TABLE `mealtimes` (
    `time` time NOT NULL,
    `pet` int(11) NOT NULL,
    `type` varchar(100) NOT NULL,
    `amount` varchar(100) NOT NULL,
    `notes` TEXT,
    FOREIGN KEY (`pet`) REFERENCES `pets`(`petID`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`time`, `pet`)
);

LOCK TABLES `mealtimes` WRITE;

INSERT INTO `mealtimes` VALUES ('07:30', 2, 'dry food', '1 scoop', NULL), ('18:00', 2, 'wet/dry combo', '1 can wet mixed with a half scoop dry', NULL);

UNLOCK TABLES;