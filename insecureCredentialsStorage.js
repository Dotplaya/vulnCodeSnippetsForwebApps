const fs = require('fs');

// Function to save user credentials to a file
function saveCredentials(username, password) {
  const data = `Username: ${username}\nPassword: ${password}\n`;

  fs.writeFile('credentials.txt', data, err => {
    if (err) {
      console.error('Error saving credentials:', err);
    } else {
      console.log('Credentials saved successfully!');
    }
  });
}

// Example usage
const username = 'admin';
const password = 'P@ssw0rd';

saveCredentials(username, password);

// In this code, the saveCredentials function takes a username and password as parameters and writes them 
// to a file named credentials.txt using the fs.writeFile function. This is a simple and insecure way of 
// storing credentials because the credentials are stored in plain text, making them easily readable if an
//  attacker gains access to the file.

// It is important to note that storing credentials in this manner is highly discouraged in real-world 
// applications, as it exposes sensitive information and can lead to unauthorized access if the file is
//  compromised.

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Define a schema for user credentials
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
});

// Function to save user credentials to the database
async function saveCredentials(username, password) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Save the username and hashed password to the database
  const User = mongoose.model('User', userSchema);
  await User.create({ username, passwordHash });

  console.log('Credentials saved successfully!');
}

// Example usage
const username = 'admin';
const password = 'P@ssw0rd';

saveCredentials(username, password);


// In this code, the bcrypt library is used to securely hash the password before storing it in the database.
//  The bcrypt.hash function generates a salted hash of the password using a specified number of salt rounds,
//   making it computationally expensive to reverse-engineer the original password.

// Additionally, the code uses the mongoose library to interact with the database and defines a schema for 
// user credentials. The saveCredentials function creates a new user document in the database, storing the 
// username and the hashed password.

