

/* table structure for table pet_on_appt */

DROP TABLE IF EXISTS `pet_on_appt`;
CREATE TABLE `pet_on_appt` (
    `pet` int(11) NOT NULL,
    `appt` int(11) NOT NULL,
    FOREIGN KEY (`pet`) REFERENCES `pets`(`petID`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`appt`) REFERENCES `appointments`(`apptID`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`pet`, `appt`)
);

LOCK TABLES `pet_on_appt` WRITE;

INSERT INTO `pet_on_appt` VALUE (1, 1);
INSERT INTO `pet_on_appt` VALUE (2, 2);
INSERT INTO `pet_on_appt` VALUE (3, 3);
INSERT INTO `pet_on_appt` VALUE (4, 4);


UNLOCK TABLES;