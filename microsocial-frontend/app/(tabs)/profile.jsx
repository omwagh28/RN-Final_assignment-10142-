// Path: app/(tabs)/profile.jsx

import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import { useContext, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import { getFeedPosts } from "../../src/services/post.service";
import PostCard from "../../src/components/PostCard";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMyPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await getFeedPosts();

      const filteredPosts = allPosts.filter(
        (post) => (post.author?._id || post.author) === user.id
      );

      setMyPosts(filteredPosts);
    } catch (error) {
      console.log("Failed to load user posts");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) loadMyPosts();
    }, [user])
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* POSTS SECTION */}
      <Text style={styles.sectionTitle}>My Posts</Text>

      <View style={{ flex: 1 }}>
        {myPosts.length === 0 ? (
          <Text style={styles.emptyText}>
            You haven’t created any posts yet.
          </Text>
        ) : (
          <FlatList
            data={myPosts}
            keyExtractor={(item) => item._id}
            refreshing={loading}
            onRefresh={loadMyPosts}
            contentContainerStyle={{ paddingBottom: 10 }}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                showDelete
                onDelete={loadMyPosts}
              />
            )}
          />
        )}
      </View>

      {/* LOGOUT BUTTON */}
      <View style={styles.logoutContainer}>
        <Button title="Logout" color="#e53935" onPress={handleLogout} />
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 16,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1e88e5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
    marginTop: 20,
  },
  logoutContainer: {
    marginTop: 10,
  },
});
