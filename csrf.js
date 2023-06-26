const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(`
    <html>
    <body>
      <h1>Change Password</h1>
      <form action="/changepassword" method="POST">
        <input type="password" name="newPassword" placeholder="New Password" />
        <input type="submit" value="Change Password" />
      </form>
    </body>
    </html>
  `);
});

app.post('/changepassword', (req, res) => {
  const newPassword = req.body.newPassword;

  // Change the password logic here (omitted for brevity)
  // In this vulnerable code, the password change request is processed without any CSRF protection

  res.send('Password changed successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the above code, the application provides a form to change the user's password. However, there is no
//  CSRF protection implemented. An attacker can create a malicious website that includes a hidden form that
//   targets the /changepassword endpoint, and if the victim user is authenticated in the vulnerable application,
//    their password can be changed without their consent.

// Mitigation 

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/', (req, res) => {
  const csrfToken = req.csrfToken();

  res.send(`
    <html>
    <body>
      <h1>Change Password</h1>
      <form action="/changepassword" method="POST">
        <input type="password" name="newPassword" placeholder="New Password" />
        <input type="hidden" name="_csrf" value="${csrfToken}" />
        <input type="submit" value="Change Password" />
      </form>
    </body>
    </html>
  `);
});

app.post('/changepassword', (req, res) => {
  const newPassword = req.body.newPassword;

  // Change the password logic here (omitted for brevity)
  // Now, the password change request will be protected by the CSRF token

  res.send('Password changed successfully!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// The csurf middleware is used to generate and validate CSRF tokens.
// The CSRF token is included as a hidden input field in the form.
// When the form is submitted, the CSRF token is sent along with the request.
// The server validates the CSRF token before processing the password change request.