const express = require("express");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/ownermodel");
const verifyAuth = require("../middlewares/veryAuth.js");

const SECRET_KEY = process.env.SECRET_KEY;

// Set token expiration to 30 minutes
function getExpiration() {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 300);
  return d.getTime();
}

const router = Router();

// api/auth/signup
//working
router.post('/signup', async (req, res) => {
  try {
    // handle user input
    const { username, password: plainPassword } = req.body;
    // hash the password
    const password = await bcrypt.hash(plainPassword, 10);
    // create new user
    const user = await User.create({
      username,
      password,
      handle: username,
    });

    const data = {
      id: user._id,
      handle: user.handle,
      exp: getExpiration(),
    };

    // Take user data, and expiration, and create a token along with the SECRET_KEY
    const token = jwt.sign(data, SECRET_KEY);

    // return the token
    return res.status(200).json({
      status: 200,
      message: `Successfully created user: ${user.username}`,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: `Unable to create user`,
      database_message: error.message,
    });
  }
});

//working
router.post('/signin', async (req, res) => {
  try {
    // handle user input
    const { username, password } = req.body;
    // Get user's password hash
    const user = await User.findOne({ username: username });
    
    // If no user is found, return an error
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: `User not found`,
      });
    }
    
    // Get the hashed password
    const hash = user.password;

    // Check that the hashes match
    const result = await bcrypt.compare(password, hash);
    if (!result) {
      return res.status(401).json({
        message: 'Incorrect password',
      });
    }

    // Same code as signup from this point onwards
    const data = {
      id: user._id,
      username: user.username,
      exp: getExpiration(),
    };

    // sign the jwt
    const token = jwt.sign(data, SECRET_KEY);

    // return the token
    return res.status(200).json({
      status: 200,
      message: `Successfully signed in @${user.username}`,
      token: token,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: `User not found`,
      database_message: error.message,
    });
  }
});

module.exports = router;


