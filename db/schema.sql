DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- this line of code is so that the lines after will work
USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, --make sql create ids for you with auto_increment, not null means it is not required
  name VARCHAR(30) NOT NULL
)

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
)

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role_id INT NOT NULL,
)

