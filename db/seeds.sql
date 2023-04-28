INSERT INTO department (name) VALUES
('Cooking'),
('Development'),
('Advertising');

INSERT INTO role (title, salary, department_id) VALUES
('Head Chef', 98970.00, 1),
('Backend Developer', 185680.00, 2),
('Sous Chef', 75000.00, 1),
('Ad Coordinator', 63748.00, 3),
('Web Developer', 230600.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Aquino', 5, NULL),
('Puma', 'Smith', 1, NULL),
('Mike', 'Wazowski', 3, 2),
('Chandler', 'Swaim', 4, NULL),
('Stella', 'Brown', 4, 4),
('Shelly', 'Kiker', 4, 4),
('Kelly', 'Scercy', 5, 1),
('Ida', 'Ho', 2, 1);
