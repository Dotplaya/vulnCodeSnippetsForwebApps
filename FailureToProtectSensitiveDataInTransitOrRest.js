const express = require('express');
const app = express();

// Endpoint for handling login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication logic

  if (authenticated) {
    // Save sensitive data in transit
    const token = generateToken(username, password);
    res.cookie('sessionToken', token); // Insecurely set the session token as a cookie
    res.send('Login successful');
  } else {
    res.send('Login failed');
  }
});

// Endpoint for accessing sensitive data
app.get('/data', (req, res) => {
  const sessionToken = req.cookies.sessionToken; // Retrieve the session token from the insecure cookie

  // Fetch sensitive data based on the session token

  res.send('Sensitive data: ' + sensitiveData);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the above code, the vulnerabilities include:

// Lack of Encryption: The session token is stored in an insecure cookie (sessionToken) without any encryption or
//     secure flags (e.g., Secure, HttpOnly, SameSite). This makes it vulnerable to interception and unauthorized
//     access.

// Insecure Data Transmission: The sensitive data is transmitted over an insecure connection, as there is no implementation 
// of encryption protocols (e.g., TLS/SSL) to protect the data in transit.

// Mitigation 