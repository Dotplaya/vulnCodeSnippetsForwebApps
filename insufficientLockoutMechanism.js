const express = require('express');
const app = express();
const loginAttempts = {};

// Login route
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the user has exceeded the maximum number of login attempts
  if (loginAttempts[username] >= 3) {
    return res.status(401).json({ error: 'Account locked. Please contact support.' });
  }

  // Perform authentication
  if (authenticate(username, password)) {
    // Successful login
    delete loginAttempts[username];
    res.json({ message: 'Login successful' });
  } else {
    // Failed login attempt
    if (!loginAttempts[username]) {
      loginAttempts[username] = 1;
    } else {
      loginAttempts[username]++;
    }
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Simulated authentication function
function authenticate(username, password) {
  // Replace this with your actual authentication logic
  // This is a simplified example
  return username === 'admin' && password === 'password';
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In this code, there is no proper account lockout mechanism implemented. The code keeps track of the number of
//  login attempts for each user in the loginAttempts object. If a user exceeds three failed login attempts, they
//   are locked out and receive an error message indicating that their account is locked.

// However, this vulnerable code snippet lacks a mechanism to enforce a delay or duration for the account 
// lockout. An attacker could simply retry the login after a certain period of time and continue brute-forcing
//  the account credentials.

// Mitigation 

const express = require('express');
const app = express();
const loginAttempts = {};

// Constants for lockout settings
const MAX_LOGIN_ATTEMPTS = 3; // Maximum number of login attempts allowed
const LOCKOUT_DURATION = 30 * 60 * 1000; // Lockout duration in milliseconds (30 minutes)

// Login route
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the user is currently locked out
  if (isUserLockedOut(username)) {
    return res.status(401).json({ error: 'Account locked. Please try again later.' });
  }

  // Perform authentication
  if (authenticate(username, password)) {
    // Successful login
    resetLoginAttempts(username);
    res.json({ message: 'Login successful' });
  } else {
    // Failed login attempt
    incrementLoginAttempts(username);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Simulated authentication function
function authenticate(username, password) {
  // Replace this with your actual authentication logic
  // This is a simplified example
  return username === 'admin' && password === 'password';
}

// Function to check if a user is currently locked out
function isUserLockedOut(username) {
  const attempts = loginAttempts[username];
  return attempts && attempts >= MAX_LOGIN_ATTEMPTS && Date.now() - attempts.timestamp < LOCKOUT_DURATION;
}

// Function to increment login attempts for a user
function incrementLoginAttempts(username) {
  if (!loginAttempts[username]) {
    loginAttempts[username] = { count: 1, timestamp: Date.now() };
  } else {
    loginAttempts[username].count++;
    loginAttempts[username].timestamp = Date.now();
  }
}

// Function to reset login attempts for a user
function resetLoginAttempts(username) {
  delete loginAttempts[username];
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In this modified code, we introduced two new functions: isUserLockedOut and resetLoginAttempts.
//  The isUserLockedOut function checks if a user is currently locked out by verifying if they have
//   exceeded the maximum login attempts (MAX_LOGIN_ATTEMPTS) within the lockout duration (LOCKOUT_DURATION). 
//   The resetLoginAttempts function resets the login attempts for a user when a successful login occurs.