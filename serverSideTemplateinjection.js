const express = require('express');
const app = express();

// Vulnerable route
app.get('/vulnerable', (req, res) => {
  const name = req.query.name;
  const template = `<h1>Welcome, ${name}!</h1>`;
  res.send(template);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In this code snippet, the /vulnerable route takes a name parameter from the query string and
//  directly injects it into an HTML template string. This can lead to server-side template injection 
//  vulnerabilities if the name parameter is controlled by an attacker and allows them to execute arbitrary
//   code within the template.


// Mitigation 

const express = require('express');
const app = express();
const ejs = require('ejs');

// Set up the view engine
app.set('view engine', 'ejs');

// Set up static file serving
app.use(express.static('public'));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  // Pass safe data to the template
  const data = {
    username: 'John Doe',
    age: 25,
    email: 'johndoe@example.com'
  };

  res.render('index', { data });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, we're using the EJS template engine and rendering the index.ejs template. The key to
//  mitigating SSTI vulnerabilities lies in ensuring that user input is properly validated, sanitized, and 
//  escaped before passing it to the template.

// consider this as another html file named as index.ejs

// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Safe Template</title>
//   </head>
//   <body>
//     <h1>Welcome, <%= data.username %></h1>
//     <p>Age: <%= data.age %></p>
//     <p>Email: <%= data.email %></p>
//   </body>
// </html>

// By using <%= %> tags in the template, EJS will automatically escape the user data, ensuring that any 
// potentially malicious code is rendered as plain text.