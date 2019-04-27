### Schema

CREATE DATABASE theBarbershop_db;

USE theBarbershop_db;

CREATE TABLE appointments
(
	id int NOT NULL AUTO_INCREMENT,
	appointment_date DATETIME NOT NULL,
	appointment_time DATETIME NOT NULL,
	barber_last_name VARCHAR(100) NOT NULL,
	barber_id INTEGER,
	customer_first_name VARCHAR(100) NOT NULL,
	customer_last_name VARCHAR(100) NOT NULL,
	customer_email VARCHAR(100) NOT NULL,
	customer_phone VARCHAR(15) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE barbers
(
	id INT NOT NULL AUTO_INCREMENT,
	party_name varchar(255) NOT NULL,
	party_type varchar(255) NOT NULL,
	party_cost int NOT NULL,
	client_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (client_id) REFERENCES clients(id)
);
