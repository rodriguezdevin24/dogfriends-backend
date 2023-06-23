const Post = require("../models/postmodel"); // Adjust the path and file name to postmodel
const Dog = require("../models/dogmodel"); // Adjust the path and file name to postmodel

// Handler to get all posts
exports.getPosts = async (req, res) => {
    try {
        if (req.query.dogId !== undefined) {
            const posts = await Post.find({ dog: req.query.dogId });
            res.status(200).json(posts);
        } else { 
            const posts = await Post.find();
            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving posts", error: error });
    }
};
// Handler to get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post", error: error });
  }
};

// Handler to create a new post
exports.createPost = async (req, res) => {

  try {
    console.log('http://localhost:3500/' + req.file.path);
    const dogId = req.headers.dogid;
 
    // Use the dog id to go and get the dog name from the db
    const dogData = await Dog.findById(dogId);
    if (!dogData) {
      return res.status(404).json({ message: "Dog not found" });
    }
    const newPost = new Post({
      ...req.body,
      dog: dogId,
      author: dogData.name,
      photo: req.file ? req.file.path : null, // Store the file path in the 'photo' field
    });

    // console.log(newPost);

    const savedPost = await newPost.save();
  
    dogData.posts.push(savedPost._id);
    await dogData.save();
    
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error });
  }
};

// Handler to delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndRemove(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post deleted successfully", deletedPost: post });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error });
  }
};

// Handler to update a post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post updated successfully", updatedPost: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error });
  }
};
