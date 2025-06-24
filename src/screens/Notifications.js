import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Notification icon
import { useNavigation } from "@react-navigation/native"; // Navigation hook

const Notifications = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <Ionicons name="notifications-outline" size={100} color="#808080" />

        {/* Notification Text */}
        <Text style={styles.title}>No Notifications Yet</Text>
        <Text style={styles.subtitle}>
          Updates and alerts will appear here when available.
        </Text>

        {/* Navigate to App Settings */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AppSettings")}
        >
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
