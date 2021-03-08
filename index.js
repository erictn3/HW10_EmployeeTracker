const logo = require("asciiart-logo");
const inquirer = require('inquirer');
require('console.table');
const db = require("./db")
const connection = require("./db/connection");
init();

function init() {
  const asciiLogo = logo({ name: "Employee Manager"}).render();

  console.log(asciiLogo);
  
  menu();
}

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
          "Remove employee",
          "Update an employee's role",
          "View all roles",
          "Add role",
          "Remove Role",
          "view all departments",
          "Add department",
          "Remove department",
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
          viewAllDepartments();
          break;
        case "Add employee":
          addAnEmployee();
          break;        
        case "Remove employee":
          RemoveEmployee();
          break;        
        case "Update an employee's role":
          UpdateEmployee();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add an employee's role":
          addARole();
          break;
        case "Remove employee's role":
          addARole();
          break;
        case "View an employee's department":
          updateADepartment();
          break;
        case "Add an employee's department":
          updateADepartment();
          break;
        case "Update a employee's department":
          updateADepartment();
          break;
        default:
          connection.end();
      }
    });
}
