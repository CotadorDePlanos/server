CREATE TABLE plans(
    id INT GENERATED ALWAYS AS IDENTITY,
    operator_id INT NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    accommodation VARCHAR NOT NULL,
    min_people VARCHAR NOT NULL,
    tag VARCHAR NOT NULL,
    age_group VARCHAR NOT NULL,
    price FLOAT8 NOT NULL
); 

CREATE TABLE operators(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL UNIQUE
); 

CREATE TABLE admin(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
); 
