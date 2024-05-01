CREATE USER IF NOT EXISTS kcocciante@localhost IDENTIFIED BY 'password';
GRANT ALL ON pet_love.* TO kcocciante@localhost;
FLUSH PRIVILEGES;