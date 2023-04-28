INSERT INTO department (id, name) VALUES
(1, 'Cooking'),
(2, 'Development'),
(3, 'Advertising');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Head Chef', 98970.00, 1),
(2, 'Backend Developer', 185680.00, 2),
(3, 'Sous Chef', 75000.00, 1),
(4, 'Ad Coordinator', 63748.00, 3),
(5, 'Web Developer', 230600.00, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Aquino', 5, NULL),
(2, 'Puma', 'Smith', 1, NULL),
(3, 'Mike', 'Wazowski', 3, 2),
(4, 'Chandler', 'Swaim', 4, NULL),
(5, 'Stella', 'Brown', 4, 4),
(6, 'Shelly', 'Kiker', 4, 4),
(7, 'Kelly', 'Scercy', 5, 1),
(8, 'Ida', 'Ho', 2, 1);
