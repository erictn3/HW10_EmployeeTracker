const mysql = require('mysql');
const logo = require("asciiart-logo");
const inquirer = require('inquirer');
const cTable = require('console.table');



init();


function init() {
  const asciiLogo = logo({ name: "Employee Manager"}).render();

  console.log(asciiLogo);
}
  // const init = () => {
  //   inquirer
  //     .prompt({
  //       name:'department',
  //       type:'checkbox',
  //       message: 'Choose your department:',
  //       choice: ['']

  //     })
  // }