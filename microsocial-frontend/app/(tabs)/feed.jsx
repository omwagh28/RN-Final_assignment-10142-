// Path: app/(tabs)/feed.jsx

import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getFeedPosts } from "../../src/services/post.service";
import PostCard from "../../src/components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeedPosts();
      setPosts(data);
    } catch (error) {
      console.log("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFeed();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* HERO HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>MicroSocial</Text>
        <Text style={styles.tagline}>
          Connect. Share. Express.
        </Text>
      </View>

      {/* FEED CONTENT */}
      {posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No posts yet
          </Text>
          <Text style={styles.emptySubtitle}>
            Be the first one to start the conversation.
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadFeed}
              tintColor="#1e88e5"
            />
          }
          contentContainerStyle={styles.feedContainer}
          renderItem={({ item }) => (
            <PostCard post={item} />
          )}
        />
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },

  /* HEADER */
  header: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: "#1e88e5",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: "#e3f2fd",
    marginTop: 6,
  },

  /* FEED */
  feedContainer: {
    padding: 16,
    paddingTop: 20,
  },

  /* EMPTY STATE */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
  },
});
