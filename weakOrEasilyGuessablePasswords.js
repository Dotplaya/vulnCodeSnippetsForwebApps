// This code snippet demonstrates weak password validation

// Function to validate the strength of a password
function validatePassword(password) {
    // Check if the password is weak or easily guessable
    if (password === 'password' || password === '123456' || password === 'qwerty') {
      return false; // Weak password
    }
    
    // Perform additional validation checks, such as minimum length, complexity rules, etc.
    // ...
    
    return true; // Strong password
  }
  
  // Example usage
  const password = 'password'; // Weak password
  const isPasswordStrong = validatePassword(password);
  
  if (isPasswordStrong) {
    console.log('Password is strong.');
  } else {
    console.log('Password is weak. Please choose a stronger password.');
  }

//   In the above code snippet, the validatePassword function checks if the password provided is weak or easily
//    guessable. In this example, the code only checks for a few common weak passwords like "password," "123456,"
//     and "qwerty." However, it is essential to note that this is an oversimplified validation and does not cover
//      all possible weak password scenarios.

// Mitigation 

const passwordValidator = require('password-validator');

// Create a password schema
const schema = new passwordValidator();

// Add password requirements to the schema
schema
  .is().min(8)                          // Minimum length of 8 characters
  .is().max(100)                        // Maximum length of 100 characters
  .has().uppercase()                    // Requires at least one uppercase letter
  .has().lowercase()                    // Requires at least one lowercase letter
  .has().digits()                       // Requires at least one digit
  .has().not().spaces();                // Does not allow spaces

// Function to validate the strength of a password
function validatePassword(password) {
  return schema.validate(password);
}

// Example usage
const password = 'WeakPassword'; // Password to validate
const isPasswordStrong = validatePassword(password);

if (isPasswordStrong) {
  console.log('Password is strong.');
} else {
  console.log('Password is weak. Please choose a stronger password.');
}
