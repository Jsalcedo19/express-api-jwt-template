// /controllers/users.js
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


// controllers/users.js
// ... require statements above

// Add in constant for the number
const SALT_LENGTH = 12;

router.post('/signup', async (req, res) => {
    try {
      // Check if the username is already taken
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        return res.json({ error: 'Username already taken.' });
      }
      // Create a new user with hashed password
      const user = await User.create({
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
      });
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// controllers/users.js

router.post('/signin', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          process.env.JWT_SECRET
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password.' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  


module.exports = router;