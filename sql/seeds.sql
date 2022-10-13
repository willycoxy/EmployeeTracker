INSERT INTO department
    (name)
VALUES
("Administration/Operations"),
("Research and Development"),
("Marketing and Sales"),
("Human Resources"),
("Customer Service"),
("Accounting and Finance");

INSERT INTO role
    (title, salary, department_id)
VALUES
("Chief Executive Officer", "500000", 1),
("Managing Director", "250000", 3),
("Accountant", "100000", 6),
("Customer Service Rep", "50000", 5),
("Researcher", "75000", 2),
("Human Resources Manager", "125000", 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
("Will", "Cox", 1, 1),
("Johnny", "Cash", 2, NULL),
("Barney", "Rubble", 4, NULL),
("Master", "Splinter", 3, 2),
("Micheal", "Jordan", 5, NULL),
("Tiger", "Woods", 6, 3);
