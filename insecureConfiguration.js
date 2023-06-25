const express = require('express');
const app = express();
const fs = require('fs');

// Insecure configuration loading
const config = JSON.parse(fs.readFileSync('config.json'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});

// In the above code, the configuration is loaded from a JSON file (config.json) using fs.readFileSync.
//  This approach is insecure because the file is loaded without proper security measures, such as encryption
//   or access control. It exposes the sensitive configuration information (e.g., database credentials, API keys)
//    to potential attackers who gain unauthorized access to the file system.

// Mitigation 

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

// Environment variables: Instead of loading the configuration from an insecure file, we utilize environment variables
//  through the dotenv package. This allows us to store sensitive configuration data outside the codebase and securely
//   manage them.

// dotenv package: We use the dotenv package to load environment variables from a .env file. This file should be added
//  to the application's .gitignore file and kept securely. The .env file contains key-value pairs of configuration
//   variables.

// Accessing configuration: The configuration values are accessed through process.env object, which retrieves the
// values from the environment variables. The process.env.PORT variable, for example, fetches the value of the PORT
//  environment variable.