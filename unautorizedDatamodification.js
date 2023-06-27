// Insecure code - Vulnerable to unauthorized data modification

// An array of users
let users = [
    { id: 1, name: 'John Doe', role: 'user' },
    { id: 2, name: 'Jane Smith', role: 'user' },
    { id: 3, name: 'Admin', role: 'admin' }
  ];
  
  // Route to update user role (vulnerable to unauthorized modification)
  app.post('/update-role', (req, res) => {
    const userId = req.body.userId;
    const newRole = req.body.role;
  
    // Find the user by ID
    const user = users.find(u => u.id === userId);
  
    if (user) {
      // Insecure: Allowing unauthorized modification of user roles
      user.role = newRole;
  
      res.send('User role updated successfully.');
    } else {
      res.status(404).send('User not found.');
    }
  });
  

//   In the above code, the /update-role route allows anyone to modify the user roles without proper authorization
//   . An attacker can send a POST request with a specific userId and newRole to modify the role of any user in the 
//   users array.

// Mitigation 

app.post('/update-role', (req, res) => {
    const { userId, newRole } = req.body;
  
    // Perform authorization check to ensure the user is authorized to modify the data
    if (!isUserAdmin(req.user)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  
    // Proceed with updating the user role
    const user = getUserById(userId);
    if (user) {
      user.role = newRole;
      return res.json({ message: 'User role updated successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });

//   In the above code, we've introduced an authorization check before allowing the modification of the user role.
//    The isUserAdmin function is a placeholder that represents the appropriate logic to determine if the logged-in
//     user has administrative privileges. If the user is not authorized, a 403 Forbidden response is sent.
  