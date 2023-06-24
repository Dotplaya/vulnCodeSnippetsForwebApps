const express = require('express');
const app = express();

// Insecure access control: No proper authorization check
app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const user = getUserById(userId);
  res.json(user);
});

function getUserById(userId) {
  // Insecure implementation: No access control check
  // Assume this function fetches user data from a database
  return db.users.find((user) => user.id === userId);
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, there is a route /profile/:id that fetches user data based on the provided id 
// parameter. However, there is no proper authorization check to ensure that the requesting user has
//  the necessary permissions to access the profile data of the specified id. This allows an attacker 
//  to guess or manipulate the id parameter to access other users' profiles, potentially leading to
//   unauthorized information disclosure or data leakage.

// Mitigation 

const express = require('express');
const app = express();

app.get('/profile/:id', authorizeUser, (req, res) => {
  const userId = req.params.id;

  // Verify if the requesting user has access to the specified profile
  if (req.user.id === userId || req.user.role === 'admin') {
    const user = getUserById(userId);
    res.json(user);
  } else {
    res.status(403).send('Forbidden');
  }
});

function authorizeUser(req, res, next) {
  // Implement your authentication logic here
  // For example, check if the user is logged in and has a valid session
  // Set the user object on the request for further authorization checks

  // Example logic, replace with your actual authentication and session management
  const user = authenticateUser(req.headers.authorization); // Example logic, replace with your actual authentication check
  if (user) {
    req.user = user; // Set the authenticated user object on the request
    next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    res.status(401).send('Unauthorized'); // User is not authenticated, send an error response
  }
}

function getUserById(userId) {
  // Implement your logic to fetch user data based on userId
  // Ensure to perform proper authorization checks before returning the data
  // Return the user object or null if the user is not found
  // Example implementation, replace with your actual data retrieval logic
  const user = db.users.find((user) => user.id === userId);
  return user || null;
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the updated code, the /profile/:id route now includes the authorizeUser middleware, which authenticates and authorizes the 
// requesting user. The middleware checks if the user is logged in, has a valid session, and has the necessary permissions 
// (either the owner of the profile or an admin) to access the requested profile. If the user is authorized, the profile data 
// is returned. Otherwise, a 403 Forbidden response is sent.