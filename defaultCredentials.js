const express = require('express');
const app = express();

app.get('/admin', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username === 'admin' && password === 'admin123') {
    res.send('Welcome, admin!');
  } else {
    res.send('Invalid credentials');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the above code, the /admin route allows access using default credentials 'admin' as the username and
//  'admin123' as the password. This is a vulnerable implementation as it uses hardcoded, well-known credentials
//  , which can be easily guessed or exploited by attackers.

// Mitigation 

const express = require('express');
const app = express();

const users = [
  { username: 'admin', password: 'admin123' },
  // Add more user objects as needed
];

app.get('/admin', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.send('Welcome, admin!');
  } else {
    res.send('Invalid credentials');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// The default credentials are no longer used. Instead, we have an array of user objects stored in the users array.

// The /admin route compares the provided username and password with the credentials stored in the users array using
//  the Array.prototype.find() method. It checks if a matching user object is found with the provided credentials.

// If a matching user is found, it sends a "Welcome, admin!" message indicating successful authentication. Otherwise,
//  it sends an "Invalid credentials" message.

// Use Strong Credentials: Implement a robust user authentication system that requires users to set strong, unique
//  passwords during the account creation process. Encourage users to use complex passwords and enforce 
//  password policies such as minimum length, special characters, and regular password changes.

// Disable Default Accounts: Remove or disable any default accounts or credentials that are shipped with
//  your application or system. Default credentials are often well-known and can be easily exploited by
//   attackers.

// Implement Account Lockouts: Implement mechanisms to lock user accounts after a certain number of failed 
// login attempts to prevent brute-force attacks. This helps to mitigate the risk of unauthorized access even 
// if weak or default credentials are used.

// Secure Credential Storage: Store user passwords using strong cryptographic hashing algorithms 
// (e.g., bcrypt, Argon2) with proper salt values. Avoid storing plaintext or weakly encrypted passwords.

// User Education: Educate users about the importance of using unique, strong passwords and practicing good
//  password hygiene. Encourage them to avoid reusing passwords across different accounts.