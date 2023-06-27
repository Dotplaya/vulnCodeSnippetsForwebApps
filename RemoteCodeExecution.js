const express = require('express');
const app = express();

app.get('/execute', (req, res) => {
  const { command } = req.query;

  // Vulnerable code: Executes the command from the query string directly
  const result = eval(command);

  res.send(result);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In this code snippet, the /execute endpoint accepts a query parameter named command. The vulnerable code uses the 
// eval function to directly execute the value of the command parameter as JavaScript code. This allows an attacker to
//  inject arbitrary code and execute it on the server.

// It's important to note that this code is highly insecure and should never be used in a production environment.
//  RCE vulnerabilities can lead to serious security risks, including unauthorized access, data leaks, and system 
//  compromise

const express = require('express');
const app = express();

app.get('/execute', (req, res) => {
  const { command } = req.query;

  // Mitigated code: Executes predefined commands or rejects invalid ones
  let result;
  if (command === 'validCommand') {
    result = executeValidCommand();
  } else {
    result = 'Invalid command';
  }

  res.send(result);
});

function executeValidCommand() {
  // Perform the logic for the valid command
  return 'Result of valid command';
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// In the mitigated code, the executeValidCommand function represents a predefined valid command that you want to 
// allow. You can replace it with the actual logic or commands that are safe to execute. The code now checks if the
//  command value matches the predefined valid command. If it does, the appropriate logic is executed and the result
//   is returned. If the command value is not valid, the response will indicate that it's an invalid command.

