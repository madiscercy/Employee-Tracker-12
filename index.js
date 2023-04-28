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
                    // Function to add a role
                    break;
                case 'Add an employee':
                    // Function to add an employee
                    break;
                case 'Update an employee role':
                    // Function to update an employee role
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
  
