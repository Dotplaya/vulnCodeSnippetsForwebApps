const express = require('express');
const app = express();

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Simulating a database query
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  if (!user) {
    // If the user is not found, throw an error
    throw new Error('User not found');
  }

  res.json(user);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Insecure error handling - exposing the error details to the client
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, the /users/:id endpoint retrieves user information based on the provided id.
// If the user is not found, it throws an error with a message "User not found". However, the error
//  handling mechanism is insecure.

// The insecure part is in the error handler middleware, where the full error details, including the
//  error message, are sent back to the client in the response body. This can potentially expose sensitive
//   information and aid attackers in understanding the application's internals.

// Mitigation 

const express = require('express');
const app = express();

app.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;

  // Simulating a database query
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }

  res.json(user);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Generic error response without exposing sensitive information
  res.status(err.status || 500).json({ error: 'An error occurred' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the updated code, the error handler middleware receives the error object and sends a generic
//  error response without exposing the specific error message. Instead, it simply responds with the
//   message "An error occurred". This ensures that sensitive information is not leaked to the client.

// Additionally, note that the error object has a status property set to 404 when the user is not found.
//  This allows you to customize the HTTP status code in the error response to provide appropriate information
//   about the nature of the error.
