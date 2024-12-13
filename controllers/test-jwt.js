// controllers/test-jwt.js

const express = require('express');
const router = express.Router();
// Add in the jsonwebtoken package
const jwt = require('jsonwebtoken');


// controllers/test-jwt.js
router.get('/sign-token', (req, res) => {
    // Mock user object added
    const user = {
      _id: 1,
      username: 'test',
      password: 'test',
    };
     // Create a token using the sign method
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
      // Send the token back to the client
    res.json({ token });
  });
  
// controllers/test-jwt.js
// controllers/test-jwt.js

router.post('/verify-token', (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      // Add in verify method
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ decoded });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token.' });
    }
  });
  
  

module.exports = router;