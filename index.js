const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qLZ2MH&Fn*L',
    database: 'employee_manager_db'
});

db.connect(err => {
    if (err) throw err;
    init();
});

function init() {
    console.log(`
    
  ______ __  __ _____  _      ______     ________ ______ 
  |  ____|  \\/  |  __ \\| |    / __ \\ \\   / /  ____|  ____|
  | |__  | \\  / | |__) | |   | |  | \\ \\_/ /| |__  | |__   
  |  __| | |\\/| |  ___/| |   | |  | |\\   / |  __| |  __|  
  | |____| |  | | |    | |___| |__| | | |  | |____| |____ 
  |______|_|  |_|_|_   |______\\____/__|_|__|______|______|
  |  \\/  |   /\\   | \\ | |   /\\   / ____|  ____|  __ \\     
  | \\  / |  /  \\  |  \\| |  /  \\ | |  __| |__  | |__) |    
  | |\\/| | / /\\ \\ | .   | / /\\ \\| | |_ |  __| |  _  /     
  | |  | |/ ____ \\| |\\  |/ ____ \\ |__| | |____| | \\ \\     
  |_|  |_/_/    \\_\\_| \\_/_/    \\_\\_____|______|_|  \\_\\    
                                                          
                                                          
 
   -------------------------------------------------------                                                        
                                                           
  `)
  mainMenu();
}

function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ])
        .then(answers => {
            switch (answers.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                default:
                    db.end();
            }
        });
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', (error, results) => {
      if (error) throw error;
      console.table(results);
      mainMenu();
    });
  }
  
  function viewAllRoles() {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id
    `;
    db.query(query, (error, results) => {
      if (error) throw error;
      console.table(results);
      mainMenu();
    });
  }
  
  function viewAllEmployees() {
    const query = `
      SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      JOIN role ON e.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `;
    db.query(query, (error, results) => {
      if (error) throw error;
      console.table(results);
      mainMenu();
    });
  }
  
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:',
        },
      ])
      .then((response) => {
        db.query('INSERT INTO department (name) VALUES (?)', [response.departmentName], (error, results) => {
          if (error) throw error;
          console.log('Department added successfully.');
          mainMenu();
        });
      });
  }

  function addRole() {
    db.query('SELECT * FROM department', (error, departments) => {
      if (error) throw error;
  
      const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
      }));
  
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the role',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for this role:',
          validate: (input) => {
            if (isNaN(input)) {
              return 'Please enter a valid number.';
            }
            return true;
          },
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department this role belongs to:',
          choices: departmentChoices,
        },
      ])
      .then((response) => {
        db.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [response.title, response.salary, response.departmentId],
          (error, results) => {
            if (error) throw error;
            console.log('Role added successfully.');
            mainMenu();
          }
        );
      });
  });
}

function addEmployee() {
  db.query('SELECT * FROM role', (error, roles) => {
    if (error) throw error;

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    db.query('SELECT * FROM employee', (error, employees) => {
      if (error) throw error;

      const managerChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      managerChoices.unshift({ name: 'None', value: null });

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee\'s first name:',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee\'s last name:',
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the employee\'s role:',
            choices: roleChoices,
          },
          {
            type: 'list',
            name: 'managerId',
            message: 'Select the employee\'s manager:',
            choices: managerChoices,
          },
        ])
        .then((response) => {
          db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [response.firstName, response.lastName, response.roleId, response.managerId],
            (error, results) => {
              if (error) throw error;
              console.log('Employee added successfully.');
              mainMenu();
            }
          );
        });
    });
  });
}

function updateEmployeeRole() {
  db.query('SELECT * FROM employee', (error, employees) => {
    if (error) throw error;

    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    db.query('SELECT * FROM role', (error, roles) => {
      if (error) throw error;

      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update their role:',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the employee\'s new role:',
            choices: roleChoices,
          },
        ])
        .then((response) => {
          db.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [response.newRoleId, response.employeeId],
            (error, results) => {
              if (error) throw error;
              console.log('Employee role updated successfully.');
              mainMenu();
            }
          );
        });
    });
  });
}
