

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

INSERT INTO `users` VALUES ('email@gmail.com', 'u_name24', 'John', 'Smith', NULL, NULL), ('ahhh@gmail.com', 'usernaaaame', 'Amy', 'Smith', NULL, NULL), ('x@gmail.com', 'myProfile', 'Jacob', 'Johnson', NULL, NULL);

UNLOCK TABLES;