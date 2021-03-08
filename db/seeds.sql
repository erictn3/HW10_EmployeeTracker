use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Marketing'),
    ('Engineering'),
    ('Sales'),
    ('Operations');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Marketing Director', 100000, 1),
    ('Marketing Assistant', 50000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Sales Lead', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
