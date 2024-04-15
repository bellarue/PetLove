

/* table structure for table medications */

DROP TABLE IF EXISTS `medications`;
CREATE TABLE `medications` (
    `name` varchar(150) NOT NULL,
    `startDate` Date NOT NULL,
    `pet` int(11) NOT NULL,
    `veterinarian` varchar(320),
    `type` varchar(100) NOT NULL,
    `dosage` varchar(200) NOT NULL,
    `admin_method` varchar(100) NOT NULL,
    `notes` TEXT,
    FOREIGN KEY (`pet`) REFERENCES `pets`(`petID`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`veterinarian`) REFERENCES `veterinarians`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`name`, `startDate`, `pet`)
);

LOCK TABLES `medications` WRITE;

INSERT INTO `medications` VALUE ('Frontline Plus', '2023-03-28', 1, 'MJ@gmail.com', 'flea meds', '1 pill daily', 'orally', NULL),
INSERT INTO `medications` VALUE ('Trazodone', '2024-05-28', 2, 'MJ@gmail.com', 'anxiety', '1 pill daily', 'orally', NULL),
INSERT INTO `medications` VALUE ('Drontal', '2024-02-28', 3, 'MJ@gmail.com', 'worm', '2 pills daily', 'orally', NULL),
INSERT INTO `medications` VALUE ('Drontal', '2024-06-28', 4, 'MJ@gmail.com', 'worm', '2 pills daily', 'orally', NULL);




UNLOCK TABLES;