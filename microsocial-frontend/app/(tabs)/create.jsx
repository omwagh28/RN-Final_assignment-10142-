// Path: app/(tabs)/create.jsx

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createPost } from "../../src/services/post.service";
import { useRouter } from "expo-router";

export default function Create() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreatePost = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Post content cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await createPost(content);
      setContent("");
      Alert.alert("Success", "Post created successfully");
      router.replace("/(tabs)/feed");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create a Post</Text>
        <Text style={styles.subtitle}>
          Share what’s on your mind
        </Text>

        <TextInput
          placeholder="What's on your mind?"
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.button,
            (!content.trim() || loading) && styles.buttonDisabled,
          ]}
          onPress={handleCreatePost}
          disabled={!content.trim() || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Posting..." : "Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 15,
    backgroundColor: "#fafafa",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1e88e5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9ec5f0",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
