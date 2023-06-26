const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  const page = req.query.page;
  const content = fs.readFileSync(`pages/${page}.html`, 'utf8');
  res.send(content);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// In the above code, the application serves dynamic content based on the value of the page query parameter.
//  However, it directly incorporates the user-provided value into the file path, which can lead to local file
//   inclusion vulnerabilities.

// An attacker can exploit this vulnerability by supplying a crafted value for the page parameter, allowing them
//  to read arbitrary files from the server's file system. For example, an attacker can request /?page=../../../
//  etc/passwd to read the /etc/passwd file.

// Mitigation 

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  const page = req.query.page;
  
  // Validating the user input to prevent directory traversal
  if (!page || !/^[a-zA-Z0-9_-]+$/.test(page)) {
    return res.status(400).send('Invalid page');
  }
  
  // Limiting the accessible pages to a predefined whitelist
  const whitelist = ['home', 'about', 'contact'];
  if (!whitelist.includes(page)) {
    return res.status(404).send('Page not found');
  }

  const content = fs.readFileSync(`pages/${page}.html`, 'utf8');
  res.send(content);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


// The user-provided page parameter is validated to ensure it only contains alphanumeric characters, underscores,
//  and hyphens. This prevents directory traversal attacks.
// A whitelist of allowed pages is defined, and the page parameter is checked against this whitelist. If the requested
//  page is not in the whitelist, a 404 error is returned.
// By enforcing input validation and access control, you mitigate the risk of local file inclusion vulnerabilities and 
// restrict access to only the intended pages.

