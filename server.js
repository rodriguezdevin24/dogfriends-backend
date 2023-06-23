const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('./db/connection.js');
const ownerRoutes = require('./routes/ownerroute.js');
const postRoutes = require('./routes/postroute.js');
const dogRoutes = require('./routes/dogroute.js');
const authRoutes = require('./routes/authroute.js');
dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use('/api', ownerRoutes); // Use '/api/owners' for owner routes
app.use('/api', postRoutes); // Use '/api/posts' for post routes
app.use('/api', dogRoutes); // Use '/api/dogs' for dog routes
app.use('/api/auth', authRoutes); // Use '/api/'

app.listen(PORT, () => {
  console.log(`The backend server has started on Port ${PORT}!`);
});
