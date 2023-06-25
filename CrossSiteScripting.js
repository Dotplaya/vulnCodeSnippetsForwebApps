const express = require('express');
const app = express();

// Endpoint for displaying user-provided input
app.get('/message', (req, res) => {
  const message = req.query.message; // User-provided input

  // Display the message on the page without proper sanitization
  res.send(`<h1>${message}</h1>`);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, the server takes a user-provided input from the query parameter message
//  and directly includes it in the HTML response without proper sanitization or encoding. 
//  This design allows for potential XSS attacks because any JavaScript code entered by the user
//   will be executed when the response is rendered in the browser.

// Mitigation 

const express = require('express');
const app = express();
const xss = require('xss'); // Using a library like XSS to sanitize the input

// Endpoint for displaying user-provided input
app.get('/message', (req, res) => {
  const message = req.query.message; // User-provided input

  // Sanitize the message using a library like XSS
  const sanitizedMessage = xss(message);

  // Display the sanitized message on the page
  res.send(`<h1>${sanitizedMessage}</h1>`);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the updated code, the xss library is used to sanitize the message input before displaying it 
// in the HTML response. This library escapes special characters and prevents execution of any embedded
//  JavaScript code, effectively mitigating the XSS vulnerability.
