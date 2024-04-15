

 /* table structure for table veterinarians */

DROP TABLE IF EXISTS `veterinarians`;
CREATE TABLE `veterinarians` (
    `email` varchar(320) NOT NULL UNIQUE,
    `name` varchar(100) NOT NULL,
    `phone_num` varchar(10),
    PRIMARY KEY (`email`)
);

LOCK TABLES `veterinarians` WRITE;

INSERT INTO `veterinarians` VALUE ('MJ@gmail.com', 'Mary Johnson', '8881234567');


UNLOCK TABLES;