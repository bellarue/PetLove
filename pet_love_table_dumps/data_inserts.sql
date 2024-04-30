-- INSERT INTO `users` VALUES ('email@gmail.com', 'u_name24', 'John', 'Smith', NULL, NULL);
-- INSERT INTO `users` VALUES ('ahhh@gmail.com', 'usernaaaame', 'Amy', 'Smith', NULL, NULL);
-- INSERT INTO `users` VALUES ('Andreahhh@gmail.com', 'testname', 'Andrea', 'Smith', NULL, NULL);
-- INSERT INTO `users` VALUES ('x@gmail.com', 'myProfile', 'Jacob', 'Johnson', NULL, NULL);

INSERT INTO `veterinarians` VALUE ('MJ@gmail.com', 'Mary Johnson', '8881234567');

-- INSERT INTO `pets` VALUES (NULL, 'Gus', 'lizard', NULL, 'MJ@gmail.com');
-- INSERT INTO `pets` VALUES (NULL, 'Dave', 'cat', NULL, 'MJ@gmail.com');
INSERT INTO `pets` VALUES (NULL, 'Walter', 'snake', NULL, 'MJ@gmail.com');
INSERT INTO `pets` VALUES (NULL, 'Jesse', 'hamster', NULL, 'MJ@gmail.com');

-- INSERT INTO `appointments` VALUE (NULL, '2024-03-20', 'email@gmail.com', 'groomer', 'cut nails, hygiene trim');
INSERT INTO `appointments` VALUE (NULL, '2024-03-22', 'email@gmail.com', 'groomer', 'cut nails, brush hair');
INSERT INTO `appointments` VALUE (NULL, '2024-03-29', 'ahhh@gmail.com', 'groomer', 'express glands, teeth cleaning');
INSERT INTO `appointments` VALUE (NULL, '2024-04-10', 'x@gmail.com', 'groomer', 'hair trim');
INSERT INTO `appointments` VALUE (NULL, '2020-02-14', 'x@gmail.com', 'groomer', 'teeth cleaning');
INSERT INTO `appointments` VALUE (NULL, '2024-09-15', 'email@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2026-12-19', 'x@gmail.com', 'groomer', 'shower');
INSERT INTO `appointments` VALUE (NULL, '2025-05-21', 'email@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2023-01-21', 'email@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2024-05-21', 'email@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2024-04-21', 'ahhh@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2024-06-02', 'ahhh@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2024-05-02', 'ahhh@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2024-07-02', 'ahhh@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2024-010-02', 'ahhh@gmail.com', 'groomer', 'check up');
INSERT INTO `appointments` VALUE (NULL, '2024-06-23', 'ahhh@gmail.com', 'groomer', 'check up');

-- INSERT INTO `allergies` VALUE (1, 'Eggs');
INSERT INTO `allergies` VALUE (2, 'Fleas');
INSERT INTO `allergies` VALUE (3, 'Wheat');
INSERT INTO `allergies` VALUE (4, 'Soy');

INSERT INTO `friendships` VALUE ('email@gmail.com', 'ahhh@gmail.com');


INSERT INTO `mealtimes` VALUES ('07:30', 2, 'dry food', '1 scoop', NULL), 
('18:00', 2, 'wet/dry combo', '1 can wet mixed with a half scoop dry', NULL);

-- INSERT INTO `mealtimes` VALUES ('07:30', 2, 'dry food', '1 scoop', NULL), 
-- ('18:00', 2, 'wet/dry combo', '1 can wet mixed with a half scoop dry', NULL);
INSERT INTO `mealtimes` VALUES ('07:45', 1, 'dry food', '1.5 scoops', NULL), ('17:00', 1, 'wet/dry combo', '1 can wet mixed with a half scoop dry', NULL);
INSERT INTO `mealtimes` VALUES ('06:30', 3, 'dry food', '2 scoops', NULL), ('16:00', 3, 'wet/dry combo', '1 scoop wet mixed with a 1 scoop dry', NULL);
INSERT INTO `mealtimes` VALUES ('07:30', 4, 'wet food', '1 scoop', NULL), ('16:00', 4, 'wet/dry combo', '1 scoop wet mixed with a 1 scoop dry', NULL);

-- INSERT INTO `medications` VALUE ('A med', '2024-03-28', 2, 'vet@gmail.com', 'anxiety', '1 pill daily', 'orally', NULL);
INSERT INTO `medications` VALUE ('Frontline Plus', '2023-03-28', 1, 'MJ@gmail.com', 'flea meds', '1 pill daily', 'orally', NULL);
-- INSERT INTO `medications` VALUE ('Trazodone', '2024-05-28', 2, 'MJ@gmail.com', 'anxiety', '1 pill daily', 'orally', NULL);
INSERT INTO `medications` VALUE ('Drontal', '2024-02-28', 3, 'MJ@gmail.com', 'worm', '2 pills daily', 'orally', NULL);
INSERT INTO `medications` VALUE ('Drontal', '2024-06-28', 4, 'MJ@gmail.com', 'worm', '2 pills daily', 'orally', NULL);

INSERT INTO `pet_parents` VALUE ('email@gmail.com', 1);
-- INSERT INTO `pet_parents` VALUE ('email@gmail.com', 2);
INSERT INTO `pet_parents` VALUE ('smith@gmail.com', 3);
INSERT INTO `pet_parents` VALUE ('x@gmail.com', 4);

INSERT INTO `pet_sitters` VALUE ('Andreahhh@gmail.com', 2);

-- INSERT INTO `vets_of_owners` VALUE ('email@gmail.com', 'vet@gmail.com');
INSERT INTO `vets_of_owners` VALUE ('ahhh@gmail.com', 'MJ@gmail.com');
INSERT INTO `vets_of_owners` VALUE ('x@gmail.com', 'MJ@gmail.com');

INSERT INTO `pet_on_appt` VALUE (1, 2);
-- INSERT INTO `pet_on_appt` VALUE (2, 1);
INSERT INTO `pet_on_appt` VALUE (3, 3);
INSERT INTO `pet_on_appt` VALUE (4, 4);

-- scrapped
-- INSERT INTO `preferred_brands` VALUE ('07:30', 1, 'Purina');
-- INSERT INTO `preferred_brands` VALUE ('10:45', 2, 'Purina');
-- INSERT INTO `preferred_brands` VALUE ('11:30', 3, 'Purina');
-- INSERT INTO `preferred_brands` VALUE ('08:30', 4, 'Purina');

-- INSERT INTO `user_roles` VALUES ('ahhh@gmail.com', 'Owner'), ('email@gmail.com', 'Owner');
-- INSERT INTO `user_roles` VALUES ('x@gmail.com', 'Owner'), ('Andreahhh@gmail.com', 'Sitter');