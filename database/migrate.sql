
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
    PRIMARY KEY (id)
); 

DROP TABLE IF EXISTS messages;
CREATE TABLE messages(
    id INT GENERATED ALWAYS AS IDENTITY,
    message VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    PRIMARY KEY (id)
); 

DROP TABLE IF EXISTS operators;
CREATE TABLE operators(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL UNIQUE,
    active BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
); 

DROP TABLE IF EXISTS message_operator;
CREATE TABLE message_operator(
    id serial,
    message_id int NOT NULL,
    operator_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY (operator_id) REFERENCES operators(id) ON DELETE CASCADE
); 

DROP TABLE IF EXISTS plans;
CREATE TABLE plans(
    id INT GENERATED ALWAYS AS IDENTITY,
	operator_id INT NOT NULL REFERENCES operators (id),
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    accommodation VARCHAR NOT NULL,
    min_people INT NOT NULL,
    tag VARCHAR NOT NULL,
    active BOOLEAN DEFAULT true,
    PRIMARY KEY(id)
); 

DROP TABLE IF EXISTS plan_variant;
CREATE TYPE age_group AS ENUM ('18', '23', '28', '33', '38', '43', '48', '53', '58', '59');
CREATE TABLE plan_variant(
    id INT GENERATED ALWAYS AS IDENTITY,
    plan_id INT NOT NULL REFERENCES plans (id),
    age_group age_group NOT NULL,
    price FLOAT8 NOT NULL,
    PRIMARY KEY(id)

); 