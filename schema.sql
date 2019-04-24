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
