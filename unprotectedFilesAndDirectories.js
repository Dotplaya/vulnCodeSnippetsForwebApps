const express = require('express');
const app = express();

// Expose sensitive files and directories
app.use('/admin', express.static(__dirname + '/admin'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In this code snippet, the express.static middleware is used to serve static files from the /admin directory.
//  However, if sensitive files or directories are stored within the /admin directory, this can be a security 
//  vulnerability. An attacker could potentially guess or discover the URL and gain unauthorized access to 
//  sensitive information.

// Mitigation 

const express = require('express');
const app = express();

// Define a middleware to protect sensitive routes
app.use('/admin', (req, res, next) => {
  // Implement your access control logic here
  // For example, check if the user is authenticated and authorized

  // If the user is not authorized, return a 403 Forbidden response
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send('Access denied.');
  }

  // If the user is authorized, proceed to the next middleware
  next();
});

// Serve static files from a non-sensitive directory
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In this code snippet, the /admin route is protected using a middleware. Inside the middleware, 
// you can implement your access control logic based on your application's requirements. For example
// , you can check if the user is authenticated and authorized to access the /admin route. If the user
//  is not authorized, a 403 Forbidden response is returned, indicating access denied.