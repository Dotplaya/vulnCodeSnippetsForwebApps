const express = require('express');
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers
  next();
});

// Route that sends sensitive data
app.get('/data', (req, res) => {
  const sensitiveData = 'This is sensitive data!';
  res.send(sensitiveData);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, the server sets permissive CORS headers that allow requests from any origin (*), allow specific
//  HTTP methods (GET, POST, PUT, DELETE), and allow specific headers (Origin, X-Requested-With, Content-Type, Accept).
//   This configuration poses a security risk because it allows any website to make cross-origin requests to your server,
//    potentially leading to data leakage or unauthorized access to sensitive resources.

// Mitigation 

const express = require('express');
const app = express();

// Enable CORS with restricted configuration
app.use((req, res, next) => {
  const allowedOrigins = ['https://example.com', 'https://trusted-domain.com']; // List of trusted origins

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin); // Allow requests from trusted origins
  }

  res.header('Access-Control-Allow-Methods', 'GET'); // Only allow GET method
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers
  next();
});

// Route that sends sensitive data
app.get('/data', (req, res) => {
  const sensitiveData = 'This is sensitive data!';
  res.send(sensitiveData);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the updated code, the CORS configuration is more secure. Only requests originating from the specified trusted domains 
// (https://example.com and https://trusted-domain.com) are allowed. The Access-Control-Allow-Methods header is set
//  to only allow the GET method, and the allowed headers are specified explicitly. This restricts cross-origin 
//  requests to trusted domains and minimizes the risk of unauthorized access to sensitive resources.