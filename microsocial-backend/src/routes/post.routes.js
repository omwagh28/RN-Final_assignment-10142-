// Path: src/routes/post.routes.js

const express = require("express");
const router = express.Router();

const {
  createPost,
  getFeed,
  toggleLike,
  deletePost, // ✅ ADD THIS
} = require("../controllers/post.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getFeed);

// LIKE / UNLIKE
router.post("/:id/like", authMiddleware, toggleLike);

// DELETE POST
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
