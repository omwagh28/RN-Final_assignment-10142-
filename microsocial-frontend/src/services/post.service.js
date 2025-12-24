// Path: microsocial-frontend/src/services/post.service.js

import api from "./api";

// Fetch all posts (Feed)
export const getFeedPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

// Like / Unlike a post
export const toggleLikePost = async (postId) => {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data;
};

// Create a new post
export const createPost = async (content) => {
  const response = await api.post("/posts", {
    content,
  });
  return response.data;
};

// DELETE POST
export const deletePost = async (postId) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};
