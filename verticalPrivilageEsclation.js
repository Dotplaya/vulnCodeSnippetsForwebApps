const express = require('express');
const app = express();

// Insecure access control
app.get('/admin', (req, res) => {
  if (req.query.role === 'admin') {
    res.send('Welcome, admin!');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In this code snippet, there is a route /admin that requires a role query parameter to be
// set as "admin" for access. However, there is no proper authentication or authorization
// mechanism in place to verify the user's role. An attacker can simply manipulate the URL
// and set the role parameter to "admin" to bypass the access control and gain unauthorized
// access to the admin functionality.

// Mitigation 

const express = require('express');
const app = express();

// Secure access control
app.get('/admin', authenticateUser, authorizeAdmin, (req, res) => {
  res.send('Welcome, admin!');
});

// Authentication middleware
function authenticateUser(req, res, next) {
  // Implement your authentication logic here
  // Verify the user's credentials, session, JWT, etc.
  // Set req.user with authenticated user information

  // Example: Check if the user is logged in
  if (req.user) {
    next(); // User is authenticated, proceed to the next middleware
  } else {
    res.status(401).send('Unauthorized'); // User is not authenticated
  }
}

// Authorization middleware
function authorizeAdmin(req, res, next) {
  // Implement your authorization logic here
  // Verify if the authenticated user has admin privileges

  // Example: Check if the user has admin role
  if (req.user.role === 'admin') {
    next(); // User is authorized, proceed to the next middleware
  } else {
    res.status(403).send('Forbidden'); // User is not authorized
  }
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the mitigated code, two middleware functions are introduced: authenticateUser and authorizeAdmin.
//  The authenticateUser function is responsible for authenticating the user and setting the authenticated
//   user information in req.user. The authorizeAdmin function verifies if the authenticated user has the admin
//    role. Only when the user is authenticated and authorized, they will be able to access the /admin route.