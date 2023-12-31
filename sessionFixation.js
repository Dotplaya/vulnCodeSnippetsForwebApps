const express = require('express');
const session = require('express-session');
const app = express();

// Insecure session configuration
app.use(session({
  secret: 'insecure_secret',
  resave: false,
  saveUninitialized: true
}));

// Login endpoint
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Assume authentication is successful
  req.session.username = username;

  res.send('Login successful');
});

// Protected resource
app.get('/profile', (req, res) => {
  const username = req.session.username;

  if (username) {
    res.send(`Welcome, ${username}!`);
  } else {
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
 

// In the above code, the vulnerability lies in the insecure session configuration. The session uses a fixed,
//  insecure secret and allows uninitialized sessions.

// To mitigate the session fixation vulnerability, you can implement the following changes:

// Use a Secure Secret: Generate a strong, random secret for the session and store it securely. For example,
//  you can use the crypto module in Node.js to generate a secure secret.

// prevent Uninitialized Sessions: Set the saveUninitialized option of the session middleware to false. 
// This ensures that only initialized sessions are saved.

const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const app = express();

// Generate a secure secret for the session
const secret = crypto.randomBytes(64).toString('hex');

// Secure session configuration
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

// Login endpoint
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Assume authentication is successful
  req.session.username = username;

  res.send('Login successful');
});

// Protected resource
app.get('/profile', (req, res) => {
  const username = req.session.username;

  if (username) {
    res.send(`Welcome, ${username}!`);
  } else {
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the updated code, the session uses a secure secret generated by the crypto module. 
// The saveUninitialized option is set to false, preventing uninitialized sessions from being saved.
//  Additionally, the session cookie has secure, httpOnly, and sameSite attributes to enhance security.
//   These changes help mitigate the session fixation vulnerability and improve the overall security of 
//   the application.