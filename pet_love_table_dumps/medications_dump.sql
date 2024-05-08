

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
    FOREIGN KEY (`pet`) REFERENCES `pets`(`petID`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`veterinarian`) REFERENCES `veterinarians`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`name`, `startDate`, `pet`)
);

LOCK TABLES `medications` WRITE;

INSERT INTO `medications` VALUE ('A med', '2024-03-28', 2, 'vet@gmail.com', 'anxiety', '1 pill daily', 'orally', NULL);

UNLOCK TABLES;