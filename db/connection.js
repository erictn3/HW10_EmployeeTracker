const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: 'root',
  // Be sure to update with your own MySQL password!
  password: '1root2user!',
  database: 'employees_db',
});

connection.connect();

// connection.query will set up use for future promises
// this query allows us to use async 
connection.query = util.promisify(connection.query)

module.exports = connection;

