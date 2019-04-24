### Schema

CREATE DATABASE theBarbershop_db;

USE theBarbershop_db;

CREATE TABLE appointments
(
	id INT NOT NULL AUTO_INCREMENT,
    barber_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    available BOOLEAN NOT NULL,
	customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR NOT NULL,
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
