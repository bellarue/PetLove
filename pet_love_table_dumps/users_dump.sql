

/* table structure for table users */

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `email` varchar(320) NOT NULL,
    `username` varchar(15) NOT NULL,
    `fname` varchar(30) NOT NULL,
    `lname` varchar(70) NOT NULL,
    `mainColor` varchar(6),
    `detailColor` varchar(6),
    /* how to do profile pic?? alternatively, provided profile icons they can choose from? */
    PRIMARY KEY (`email`)
);

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES ('Johnnysmith@gmail.com', 'u_name24', 'John', 'Smith', NULL, NULL), 
('Asmith@gmail.com', 'usernaaaame', 'Amy', 'Smith', NULL, NULL),
('Andreasmith@gmail.com', 'testname', 'Andrea', 'Smith', NULL, NULL),  
('JJ@gmail.com', 'JaJohn', 'Jacob', 'Johnson', NULL, NULL);

UNLOCK TABLES;