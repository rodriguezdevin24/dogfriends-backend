const express = require('express');
const postController = require('../controllers/postcontroller.js');
const router = express.Router();
const verifyAuth = require('../middlewares/veryAuth.js');
const upload = require('../config/multerConfig');
const multer = require('multer');

// This route does not require authentication
router.get('/posts', postController.getPosts);

router.get('/posts/:id', postController.getPostById);

// This route requires authentication and file upload
router.post('/posts', verifyAuth, upload.single('photo'), postController.createPost); // Use upload.single('photo') middleware

// These routes require authentication
router.put('/posts/:id', verifyAuth, postController.updatePost);
router.delete('/posts/:id', verifyAuth, postController.deletePost);

module.exports = router;