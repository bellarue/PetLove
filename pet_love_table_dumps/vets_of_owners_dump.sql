

/* table structure for table vets_of_owners */

DROP TABLE IF EXISTS `vets_of_owners`;
CREATE TABLE `vets_of_owners` (
    `user` varchar(320) NOT NULL,
    `vet` varchar(320) NOT NULL,
    FOREIGN KEY (`user`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`vet`) REFERENCES `veterinarians`(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`user`, `vet`)
);

LOCK TABLES `vets_of_owners` WRITE;

INSERT INTO `vets_of_owners` VALUE ('Johnnysmith@gmail.com', 'MJ@gmail.com');
INSERT INTO `vets_of_owners` VALUE ('Asmith@gmail.com', 'MJ@gmail.com');
INSERT INTO `vets_of_owners` VALUE ('JJ@gmail.com', 'MJ@gmail.com');

UNLOCK TABLES;