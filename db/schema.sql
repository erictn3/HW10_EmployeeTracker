DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- this line of code is so that the lines after will work
USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, --make sql create ids for you with auto_increment, not null means it is not required
  name VARCHAR(30) NOT NULL
)

CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(100),
  salary DECIMAL (10,2) NULL,
  department_id INT NOT NULL
)

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role_id INT NOT NULL,
)

