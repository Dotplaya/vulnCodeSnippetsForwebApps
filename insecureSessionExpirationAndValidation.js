const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.get('/login', (req, res) => {
  // Authenticate user and set session
  req.session.authenticated = true;
  req.session.user = { id: 1, username: 'exampleuser' };
  res.send('Logged in successfully');
});

app.get('/dashboard', (req, res) => {
  // Access the dashboard
  if (req.session.authenticated) {
    res.send(`Welcome to the dashboard, ${req.session.user.username}!`);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  // Invalidate the session on logout
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.send('Logged out successfully');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, the application uses the express-session middleware to manage sessions. However,
//  it lacks proper session expiration and invalidation mechanisms. Here are the vulnerabilities:

//     Insufficient Session Expiration: The code does not set an expiration time or duration for the session.
//      As a result, the session remains active indefinitely, increasing the risk of session hijacking and unauthorized
//       access.

//     Inadequate Session Invalidation: When a user logs out (/logout route), the code calls req.session.destroy()
//      to remove the session data. However, it does not enforce session invalidation on the client-side, such as 
//      clearing the session cookie. This allows an attacker with access to the session cookie to continue using it
//       even after the user logs out.

// Mitigation 

const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000, // Set an appropriate session expiration time (e.g., 1 hour)
  },
}));

app.get('/login', (req, res) => {
  // Authenticate user and set session
  req.session.authenticated = true;
  req.session.user = { id: 1, username: 'exampleuser' };
  res.send('Logged in successfully');
});

app.get('/dashboard', (req, res) => {
  // Access the dashboard
  if (req.session.authenticated) {
    res.send(`Welcome to the dashboard, ${req.session.user.username}!`);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  // Invalidate the session on logout
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Clear the session cookie on the client-side
    res.clearCookie('connect.sid');
    res.send('Logged out successfully');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the code snippet above, the following modifications have been made to mitigate the vulnerabilities:

//     Session Expiration: The cookie option in the express-session configuration has been updated to set the
//      maxAge property to an appropriate value (e.g., 1 hour). This ensures that the session will expire after
//       the specified duration.

//     Session Invalidation: Upon logout, in addition to destroying the session on the server-side, the code now 
//     uses res.clearCookie('connect.sid') to clear the session cookie on the client-side. This prevents the 
//     invalidated session from being reused.



