import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have @expo/vector-icons installed

const Notifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Notifications icon */}
        <Ionicons
          name="notifications-outline"
          size={100}
          color="#808080"
          style={styles.icon}
        />

        {/* Message Text */}
        <Text style={styles.title}>No Notifications Yet</Text>
        <Text style={styles.subtitle}>
          Updates and alerts will appear here when available.
        </Text>

        {/* Settings Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414", // Dark theme background
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#808080", // Gray color for subtitle text
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db", // Blue button color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
