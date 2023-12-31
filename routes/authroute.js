const express = require("express");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/ownermodel");
const DogModel = require("../models/dogmodel");
const verifyAuth = require("../middlewares/veryAuth.js");

const SECRET_KEY = process.env.SECRET_KEY;

// Set token expiration to 30 minutes
function getExpiration() {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 300);
  return d.getTime();
}

const router = Router();

// api/auth/isTokenValid
router.get('/isTokenValid', verifyAuth, async (req, res) => {
  try {
    // TODO Check in DB if the user is valid as an additional check
    if (req.id) {
      res.status(200).json({
        valid: true,
        status: 200,
        message: "Token is valid"
      })
    }
  } catch (error) {
    res.status(400).json({
      valid: false,
      status: 400,
      error: `Token is invalid`,
      database_message: error.message,
    })
  }
})

// api/auth/signup
//working
router.post('/signup', async (req, res) => {
  try {
    const { username, password: plainPassword, dogs} = req.body;

    const dog = await DogModel.create({
      name: dogs
    });

    const password = await bcrypt.hash(plainPassword, 10);
    
    const user = await User.create({
      username,
      password,
      handle: username,
      dogs: dog._id
    });

    const updatedDog = await DogModel.findOneAndUpdate(
      { name: dogs },
      { owner: user._id },
      { new: true }
    );

    console.log(updatedDog);

    if (!updatedDog) {
      return res.status(404).json({
        status: 404,
        error: `Dog with ID ${id} not found.`,
      });
    }

    const data = {
      id: user._id,
      handle: user.handle,
      exp: getExpiration(),
    };

    const token = jwt.sign(data, SECRET_KEY);

    return res.status(200).json({
      status: 200,
      message: `Successfully created user: ${user.username}`,
      token,
      // user: { id: user._id }, // Include the user ID
      // dog: { id: dog._id }, // Include the dog ID
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
    console.log("Hi")
    console.log("Hi", user)
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
      // user: { id: user._id }, // Include the user ID
      // dog: { id: dog._id }, // Include the dog ID
    };

    // sign the jwt
    const token = jwt.sign(data, SECRET_KEY);

    // return the token
    return res.status(200).json({
      status: 200,
      message: `Successfully signed in ${user.id}`,
      token: token,
      user
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