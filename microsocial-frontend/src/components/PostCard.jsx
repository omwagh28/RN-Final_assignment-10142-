// Path: src/components/PostCard.jsx

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toggleLikePost, deletePost } from "../services/post.service";
import { Ionicons } from "@expo/vector-icons";

export default function PostCard({ post, showDelete = false, onDelete }) {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(post.likes.includes(user.id));
    setLikeCount(post.likes.length);
  }, [post]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await toggleLikePost(post._id);
    } catch {
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(post._id);
              onDelete?.(); // refresh profile
            } catch {
              Alert.alert("Error", "Failed to delete post");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.likeBtn}
          onPress={handleLike}
          disabled={loading}
        >
          <Ionicons
            name={liked ? "thumbs-up" : "thumbs-up-outline"}
            size={20}
            color={liked ? "#1e88e5" : "#666"}
          />
          <Text style={[styles.count, liked && styles.liked]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        {showDelete && (
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color="#e53935" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    marginLeft: 6,
    color: "#666",
  },
  liked: {
    color: "#1e88e5",
    fontWeight: "bold",
  },
});
