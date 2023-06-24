const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Route to fetch user details based on input
app.get('/users', (req, res) => {
  const userId = req.query.id; // Get the user ID from the query parameter

  // Construct the SQL query with the user input directly concatenated
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  // Execute the SQL query
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the above code snippet, the /users route fetches user details based on the id query parameter.
//  However, the code directly concatenates the user input (userId) into the SQL query without proper 
//  sanitization or parameterization.

// This vulnerability can be exploited by providing a malicious input in the id query parameter, 
// such as 1 OR 1=1, which would result in the SQL query becoming SELECT * FROM users WHERE id = 1 OR 1=1.
//  This could potentially retrieve all user records from the database, bypassing the intended query logic.


// mitigation 

const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Route to fetch user details based on input
app.get('/users', (req, res) => {
  const userId = req.query.id; // Get the user ID from the query parameter

  // Construct the SQL query with a placeholder
  const query = 'SELECT * FROM users WHERE id = ?';

  // Execute the SQL query with the user input as a parameter
  connection.query(query, [userId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the updated code, the SQL query is constructed with a placeholder (?) instead of directly concatenating
//  the user input. The actual value for the id parameter is passed as an array of parameters in the connection.query
//   method. This ensures that the user input is treated as a value and not as executable SQL code, effectively
//    mitigating the SQL injection vulnerability.
