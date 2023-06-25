const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

// Insecure password storage
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Generate hash of the password using a low cost factor
  const hashedPassword = bcrypt.hashSync(password, 4);
  
  // Store the username and hashed password in the database
  db.storeUser({ username, password: hashedPassword });
  
  res.status(200).json({ message: 'Registration successful' });
});

// Insecure password comparison
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Retrieve the user's hashed password from the database
  const user = db.getUserByUsername(username);
  const storedPassword = user ? user.password : null;
  
  // Insecure password comparison
  if (storedPassword === password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});
 
// In the vulnerable code snippet above, there are two main issues related to weak password storage:

//     Insecure Password Storage: The code uses bcrypt.hashSync() function to generate a hash of the
//      password. However, it uses a low cost factor (4 in this example) for the bcrypt hashing algorithm.
//       A low cost factor means the hashing process is relatively fast and can be easily brute-forced by
// attackers.

//     Insecure Password Comparison: During the login process, the code retrieves the user's hashed password 
//     from the database and compares it directly to the provided password using === operator. This comparison
//      is not secure as it compares the plain-text password to the hashed password directly.

// Mitigation 

const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

// Secure password storage
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Generate a secure hash of the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Store the username and hashed password in the database
    db.storeUser({ username, password: hashedPassword });

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred during registration' });
  }
});

// Secure password comparison
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve the user's hashed password from the database
    const user = db.getUserByUsername(username);
    const storedPassword = user ? user.password : null;

    // Compare the provided password with the stored hashed password securely
    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (passwordMatch) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred during login' });
  }
});


// Secure Password Storage: The code uses bcrypt.hash() function to generate a secure hash of the password.
//  The cost factor is set to 12, which makes the hashing process more computationally expensive and resistant
//   to brute-force attacks.

// Secure Password Comparison: During the login process, the code uses bcrypt.compare() function to securely
//  compare the provided password with the stored hashed password. This function handles the necessary cryptographic
//   operations to compare the values securely.