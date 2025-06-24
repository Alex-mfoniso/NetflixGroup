import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed

const Download = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Cloud download icon */}
        <Ionicons
          name="cloud-download-outline"
          size={100}
          color="#808080"
          style={styles.icon}
        />

        {/* Message Text */}
        <Text style={styles.title}>No Downloads Yet</Text>
        <Text style={styles.subtitle}>
          Movies and shows you download will appear here for offline viewing.
        </Text>

        {/* Browse Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Find Something to Download</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414", // Netflix dark theme
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
    color: "#808080",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0071eb",
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
