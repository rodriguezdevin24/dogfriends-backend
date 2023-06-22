const express = require('express');
const router = express.Router();
const postController = require('../controllers/postcontroller.js');
const verifyAuth = require('../middlewares/veryAuth.js');   


// This route does not require authentication
router.get('/posts', postController.getPosts); //Working both

router.get('/posts/:id', postController.getPostById); //Working both

// This route requires authentication
router.post('/posts', verifyAuth, postController.createPost); //Working, but is it referencing correctly?

// This route requires authentication
router.delete('/posts/:id', verifyAuth, postController.deletePost); //Working

// This route requires authentication
router.put('/posts/:id', verifyAuth, postController.updatePost); //Working

module.exports = router;