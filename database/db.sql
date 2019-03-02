CREATE DATABASE if not exists database_links;

USE database_links;

CREATE TABLE if not exists users(
    id INT (11) AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(30) NOT NULL,
    fullname VARCHAR(100) NOT NULL

);




DESCRIBE users;

CREATE TABLE if not exists links (
  id INT(11)  primary key AUTO_INCREMENT NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  FOREIGN KEY(user_id) REFERENCES users(id)
);



DESCRIBE links