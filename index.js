const logo = require("asciiart-logo");
const inquirer = require('inquirer');
require('console.table');
// const db = require("./db")
const connection = require("./db/connection");
init();

// large ascii logo to start app
function init() {
  const asciiLogo = logo({ name: "Employee Manager"}).render();

  console.log(asciiLogo);
  
  menu();
}
////  ===================================================================================
// starting prompt
function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "View all employees",          
          "View all employees by departments",
          "Add employee",
          "Update an employee's role",
          "View all roles",
          "Add role",
          "View all departments",
          "Add department",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all employees by departments":
          viewEmployeesDepartments();
          break;
        case "Add employee":
          addAnEmployee();
          break;               
        case "Update an employee's role":
          updateEmployeeRole();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add role":
          addRole();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add department":
          addADepartment();
          break;
        default:
          connection.end();
      }
    });
}

 // Search all employees, join with roles and departments to display their roles, salaries, departments, and managers

//  ===================================================================================
async function viewAllEmployees() {

  const employees = await getAllEmployees();

  console.log("\n");
  console.table(employees);

  menu();
}
//  ===================================================================================

async function getAllEmployees() {

  const queryString =

  "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"

  const data = await connection.query(queryString);

  return data;
}

//  ===================================================================================
async function viewEmployeesDepartments() {

  const departments = await getAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const departmentAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);

  const queryString =

  "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?";
  const data = await connection.query(queryString, [departmentAnswer.departmentId])

  console.log("\n");
  console.table(data);

  menu();
}


//  ===================================================================================

async function getAllDepartments() {
  const queryString =

  "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name;"

  const data = await connection.query(queryString);

  return data;
}

//  ===================================================================================

async function addAnEmployee() {
  const roles = await viewAllRoles();
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the employee?",
    },
  ]);    
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));
  
  const roleAnswer = await inquirer.prompt(
    {
    type: "list",
    name: "role",
    message: "What is the employee's role?",
    choices: roleChoices,
    }
  );
  const queryString =
    "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
  connection.query(queryString, [answers.first_name, answers.last_name, roleAnswer.role]);
  menu();
}

//  ===================================================================================

async function updateEmployeeRole() {
  const employees = await viewAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const employeeAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await viewRoles();  

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const roleAnswer = await inquirer.prompt(
    {    
      type: "list",
      name: "roleId",
      message: "Which employee's role would you like to update?",
      choices: roleChoices,
    }
  );

  const queryString = "UPDATE employee SET role_id = ? WHERE id = ?";
  connection.query(queryString, [roleAnswer.roleId, employeeAnswer.employeeId]);
  menu();
}

// // like departments
//  ===================================================================================

async function viewAllRoles() {
  const roles = await getAllRoles();

  console.log("\n");
  console.table(roles);

  menu();
}

//  ===================================================================================

// // like departments
async function getAllRoles() {
  const queryString = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
  const data = await connection.query(queryString);
  return data;
}

//  ===================================================================================

async function addRole() {
  const departments = await getAllDepartments();

  const answers = await inquirer.prompt([
    {
      name: "title",
      message: "What is the title of the role?",
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
    },
  ]);

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const departmentAnswer = await inquirer.prompt(
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    },    
  );    

  console.log(`Added ${answers.title} to the database`);

  const queryString = "INSERT INTO role SET ?";
  connection.query(queryString, [departmentAnswer.title]);
  menu();
}

//  ===================================================================================

//  ===================================================================================

// async function viewAllDepartments() {
//   const departments = await getAllDepartments();

//   console.log("\n");
//   console.table(departments);

//   menu();
// }

//  ===================================================================================

async function getAllDepartments() {

  const queryString = 

  "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"

  const data = await connection.query(queryString);

  console.log("\n");
  console.table(data);

  return data;
  
}
