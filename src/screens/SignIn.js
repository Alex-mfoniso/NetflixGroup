import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to get login details from AsyncStorage
  const getLoginDetails = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");
      if (storedEmail !== null) setEmail(storedEmail);
      if (storedPassword !== null) setPassword(storedPassword);
    } catch (error) {
      console.log("Error retrieving login details:", error);
    }
  };

  useEffect(() => {
    getLoginDetails();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");

      if (storedEmail && storedPassword) {
        if (storedEmail === email && storedPassword === password) {
          // Login successful, store current session info if needed
          await AsyncStorage.setItem("isLoggedIn", "true"); // Add a session flag

          Alert.alert("Success", "Login successful");

          // Navigate to the ProfileSelection screen
          navigation.navigate("ProfileSelection");
        } else {
          Alert.alert("Error", "Invalid email or password");
        }
      } else {
        Alert.alert("Error", "No stored credentials found.");
      }
    } catch (error) {
      console.log("Error retrieving login details:", error);
      Alert.alert("Error", "An error occurred during login.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.labelStyle}>Sign In</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Email or phone number"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonParent} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.signInCode} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Use a Sign-In Code</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>New to Netflix? Sign up now.</Text>
        </Pressable>
        <Text style={styles.recaptchaText}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 28,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 150,
  },
  textInputStyle: {
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: "#adadad",
    fontSize: 18,
    height: 50,
    width: "90%",
    borderRadius: 8,
    color: "#333333",
  },
  buttonParent: {
    marginTop: 30,
    width: "90%",
    backgroundColor: "#000",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#333333",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  orText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginVertical: 10,
  },
  signInCode: {
    width: "90%",
    backgroundColor: "#000",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#333333",
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#333333",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  signUpText: {
    color: "#333333",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  recaptchaText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 14,
    marginTop: 15,
    paddingHorizontal: 20,
  },
});
