const express = require('express');
const app = express();

// Insecure default configuration
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, there are no security headers being set in the HTTP response. 
// Missing security headers can leave the application vulnerable to various attacks and 
// compromise the overall security of the application.

// Mitigation 

const express = require('express');
const helmet = require('helmet');
const app = express();

// Secure configuration with appropriate security headers
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// The helmet middleware is used to set various security headers automatically.
// The middleware adds security headers such as X-Content-Type-Options, X-Frame-Options,
//  X-XSS-Protection, Strict-Transport-Security, and others.