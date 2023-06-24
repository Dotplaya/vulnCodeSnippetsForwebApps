const express = require('express');
const app = express();

app.get('/admin', (req, res) => {
  // Insecure access control: No authorization check
  res.send('Admin panel');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, there is a route /admin that serves the admin panel. However,
//  there is no authorization check implemented to restrict access to this route. 
//  This means that anyone who knows the /admin URL can access the admin panel without
//   any authentication or authorization.

// Mtitgation 

const express = require('express');
const app = express();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  // Implement your authentication logic here
  // For example, check if the user is logged in or has a valid session
  const isAuthenticated = req.isAuthenticated(); // Example logic, replace with your actual authentication check
  if (isAuthenticated) {
    next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    res.status(401).send('Unauthorized'); // User is not authenticated, send an error response
  }
};

app.get('/admin', isAuthenticated, (req, res) => {
  // Authorized access control: Only authenticated users can access the admin panel
  res.send('Admin panel');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the updated code, the /admin route now includes the isAuthenticated middleware, which
//  checks if the user is authenticated before allowing access to the admin panel. If the user
//   is not authenticated, it sends a 401 Unauthorized response.
