const express = require('express');
const app = express();

// Route to execute a system command
app.get('/runCommand', (req, res) => {
  const userInput = req.query.command;

  // Vulnerable code: executing user input as a system command
  const result = require('child_process').execSync(userInput);

  res.send(result.toString());
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In this code snippet, the user input is directly passed to the execSync function without proper
//  validation or sanitization. This allows an attacker to inject arbitrary system commands and execute
//   them on the server

// Mitigation 

const express = require('express');
const { spawn } = require('child_process');
const app = express();

// Route to execute a system command
app.get('/runCommand', (req, res) => {
  const userInput = req.query.command;

  // Mitigated code: Using spawn to execute the command
  const command = userInput.split(' ');
  const result = spawn(command[0], command.slice(1));

  let output = '';
  result.stdout.on('data', (data) => {
    output += data.toString();
  });

  result.stderr.on('data', (data) => {
    output += data.toString();
  });

  result.on('close', (code) => {
    res.send(output);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// in the mitigated code, the spawn function is used instead of execSync. It takes the command and its arguments
//  as separate parameters, eliminating the possibility of command injection. The output of the command is captured
//   asynchronously using event listeners for stdout and stderr streams, and then sent as a response to the client.