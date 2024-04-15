

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

INSERT INTO `mealtimes` VALUES ('07:30', 1, 'dry food', '1 scoop', NULL), ('18:00', 1, 'wet/dry combo', '1 can wet mixed with a half scoop dry', NULL),
('07:45', 2, 'dry food', '1.5 scoops', NULL), ('17:00', 2, 'wet/dry combo', '1 can wet mixed with a half scoop dry', NULL),
('06:30', 3, 'dry food', '2 scoops', NULL), ('16:00', 3, 'wet/dry combo', '1 scoop wet mixed with a 1 scoop dry', NULL),
('07:30', 4, 'wet food', '1 scoop', NULL), ('16:00', 4, 'wet/dry combo', '1 scoop wet mixed with a 1 scoop dry', NULL);


UNLOCK TABLES;