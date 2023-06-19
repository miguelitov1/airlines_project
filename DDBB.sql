-- Creacion base datos
create database airline collate='utf8mb4_spanish_ci' character set = "utf8mb4";
use airline;

-- creacion tablas 
create table flights(
id int unsigned auto_increment primary key,
flightId varchar(20) not null,
airlineName varchar(60) not null
);

create table users(
id int unsigned auto_increment primary key,
userId varchar(20) unique not null,
userName varchar(30) not null,
userLastName varchar(60) not null,
userPassword varchar(255) not null,
email varchar(60) unique not null
);

CREATE TABLE tags (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(60) NOT NULL
);

create table comments(
id int unsigned auto_increment primary key,
user_id int unsigned not null,
flight_id int unsigned not null,
userComment longtext not null,
commentDate timestamp default current_timestamp,
constraint comments_users_fk foreign key (user_id)
	references users(id) on delete cascade,
constraint comments_flights_fk foreign key (flight_id)
	references flights(id) on delete cascade 
);

CREATE TABLE comments_tags (
  comment_id INT UNSIGNED NOT NULL,
  tag_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (comment_id, tag_id),
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);


