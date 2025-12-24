// Path: src/controllers/post.controller.js

const Post = require("../models/Post.model");

// ======================
// CREATE POST
// ======================
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.create({
      content,
      image: image || null,
      author: req.user, // req.user is userId
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET FEED
// ======================
exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================
// LIKE / UNLIKE POST
// ======================
exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user; // userId string

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================
// DELETE POST (ONLY AUTHOR)
// ======================
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // FIX: req.user is already the userId
    if (post.author.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
