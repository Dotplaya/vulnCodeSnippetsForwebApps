const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/fetch', (req, res) => {
  const url = req.query.url; // Extract the URL from the request query parameters

  // Make a request to the specified URL without proper validation or restriction
  axios.get(url)
    .then(response => {
      res.send(response.data); // Send back the response to the client
    })
    .catch(error => {
      res.status(500).send('Error: ' + error.message);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// In this code snippet, an Express.js server is set up to handle a GET request to the /fetch endpoint. 
// The code retrieves a URL from the request query parameters (req.query.url) and performs an HTTP GET
//  request to that URL using the axios library.

// The vulnerability lies in the lack of proper validation or restriction on the url parameter. An attacker
//  can manipulate the url query parameter to make arbitrary requests to internal resources, such as the local
//   file system, private networks, or other internal services. This can lead to data exfiltration, service abuse,
//    or even server compromise.

// Mitigation 

const express = require('express');
const axios = require('axios');
const url = require('url');

const app = express();
const port = 3000;

app.get('/fetch', (req, res) => {
  const urlString = req.query.url;
  
  try {
    const parsedUrl = new URL(urlString);
    
    // Check if the host is in the allowed whitelist
    const allowedHosts = ['example.com', 'api.example.com']; // Add your trusted hosts to this array
    if (!allowedHosts.includes(parsedUrl.hostname)) {
      throw new Error('Unauthorized host');
    }
    
    // Make a request only if the protocol is HTTP or HTTPS
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error('Invalid protocol');
    }
    
    axios.get(parsedUrl.href)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.status(500).send('Error: ' + error.message);
      });
  } catch (error) {
    res.status(400).send('Invalid URL');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// In this updated code, the following mitigation techniques are implemented:

//     URL Parsing: The url module is used to parse the input URL (urlString) and extract its components. 
//     This helps validate the URL and prevent any potential parsing errors.

//     Allowed Hosts Whitelist: The code checks if the parsed URL's hostname is included in the allowedHosts 
//     array, which contains a list of trusted hosts. If the hostname is not present, an error is thrown,
//      preventing requests to unauthorized hosts.

//     Protocol Restriction: The code ensures that the URL's protocol is either HTTP or HTTPS. Requests with other
//      protocols are rejected, mitigating potential attacks that rely on other protocols like file:// or ftp://.

//     Error Handling: Specific error messages are returned to the client to provide information about the encountered
//      errors (e.g., unauthorized host, invalid protocol, or invalid URL).

