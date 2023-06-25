// Lack of Principle of Least Privilege (POLP) 

// This is a simplified example to demonstrate the lack of POLP

// Function to delete a user
function deleteUser(userId) {
    // Insecure implementation with no authorization check
    db.deleteUser(userId);
  }
  
  // Route to delete a user
  app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    
    // Delete the user without checking authorization
    deleteUser(userId);
  
    res.status(200).json({ message: 'User deleted successfully' });
  });


//   In this code snippet, the deleteUser function allows the deletion of a user without performing 
//   any authorization check. The app.delete route handler for deleting a user calls the deleteUser
//    function directly, without verifying if the requesting user has the necessary privileges to 
//    perform this action. This violates the Principle of Least Privilege, as any user with access
//     to the route can delete any user in the system.

// Mitigation 

// Function to delete a user
function deleteUser(userId, requestingUserId) {
    // Check if the requesting user has sufficient privileges
    const requestingUser = db.getUser(requestingUserId);
    if (!requestingUser || !requestingUser.isAdmin) {
      throw new Error('Unauthorized access');
    }
  
    // Delete the user
    db.deleteUser(userId);
  }
  
  // Route to delete a user
  app.delete('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const requestingUserId = req.user.id; // Assuming you have a user object in the request
    
    try {
      // Delete the user with proper authorization check
      deleteUser(userId, requestingUserId);
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(403).json({ message: 'Unauthorized access' });
    }
  });

//   In this updated code, the deleteUser function now accepts an additional parameter requestingUserId,
//    which represents the ID of the user making the delete request. Before deleting the user, it checks
//     if the requesting user has sufficient privileges (e.g., if they are an admin) to perform the action.
//      If the user is not authorized, an Error is thrown.

// In the route handler, we retrieve the requesting user's ID from the req.user object (assuming you have a 
//     user object available after authentication) and pass it to the deleteUser function along with the target user's
//      ID. If an error is thrown during the authorization check, we catch it and return a 403 Forbidden response 
//      indicating unauthorized access.
  