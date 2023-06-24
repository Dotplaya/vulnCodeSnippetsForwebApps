const express = require('express');
const app = express();

// Insecure access control
app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const userProfile = getUserProfile(userId);
  
  // Insecure access control - No authorization check
  res.send(`Profile: ${userProfile}`);
});

// Mock function to fetch user profile
function getUserProfile(userId) {
  // Insecure implementation - No authorization check
  const profiles = {
    '1': 'John Doe',
    '2': 'Jane Smith',
    '3': 'Admin User'
  };

  return profiles[userId];
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, the /profile/:id route allows anyone to access user profiles
//  without proper authorization checks. An attacker can simply modify the id parameter
//   in the URL to access profiles of other users, including privileged accounts.

// Mitigation 

const express = require('express');
const app = express();

// Secure access control
app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  
  // Check if the user is authorized to access the profile
  if (isAuthorized(req.user, userId)) {
    const userProfile = getUserProfile(userId);
    res.send(`Profile: ${userProfile}`);
  } else {
    res.status(403).send('Access Denied');
  }
});

// Mock function to fetch user profile
function getUserProfile(userId) {
  const profiles = {
    '1': 'John Doe',
    '2': 'Jane Smith',
    '3': 'Admin User'
  };

  return profiles[userId];
}

// Mock function to check authorization
function isAuthorized(user, userId) {
  // Implement your authorization logic here
  // Check if the user has permission to access the requested profile
  // You can use user roles, permissions, or any other mechanism
  
  // Example: Only allow the user to access their own profile
  return user && user.id === userId;
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the updated code, the isAuthorized function is used to check if the user is authorized
//  to access the requested profile. The function compares the user ID from the request with 
//  the requested profile ID to ensure that only the user who owns the profile can access it. 
//  If the user is not authorized, a 403 Forbidden response is sent.