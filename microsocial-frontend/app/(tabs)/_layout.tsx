import { Tabs, Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../src/context/AuthContext";

export default function TabsLayout() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
