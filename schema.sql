DROP DATABASE IF EXISTS theoffice_db;

CREATE DATABASE theoffice_db;

USE theoffice_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (40) NOT NULL,
    PRIMARY KEY (id)

);
CREATE TABLE cast (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (40) NOT NULL,
    cool BOOLEAN NOT NULL,
    -- the two is the number of decimal points
    salary DECIMAL (10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    -- department table is referencing departmen ID
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)

);