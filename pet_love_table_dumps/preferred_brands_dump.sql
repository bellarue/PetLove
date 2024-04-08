

/* table structure for table preferred_brands, multivalue attribute of mealtime */

DROP TABLE IF EXISTS `preferred_brands`;
CREATE TABLE `preferred_brands` (
    `mealtime` time NOT NULL,
    `pet` int(11) NOT NULL,
    `brand` varchar(100) NOT NULL,
    FOREIGN KEY (`mealtime`) REFERENCES `mealtimes`(`time`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`pet`) REFERENCES `mealtimes`(`pet`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`mealtime`,`pet`, `brand`)
);

LOCK TABLES `preferred_brands` WRITE;

INSERT INTO `preferred_brands` VALUE ('07:30', 2, 'Purina');

UNLOCK TABLES;