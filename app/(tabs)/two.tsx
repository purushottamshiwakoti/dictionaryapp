import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack, useRouter } from "expo-router";
import { Button } from "react-native-paper";
import useAuthStore from "@/hooks/useAuth";

export default function TabTwoScreen() {
  const { fullName, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/(login)");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
        }}
      />
      <Text style={styles.title}>Welcome {fullName} </Text>
      <Button mode="outlined" style={{ marginTop: 10 }} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
