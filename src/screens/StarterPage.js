import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import mylogo from "../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StarterPage = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const slideAnim = useRef(new Animated.Value(200)).current;

  const navigation = useNavigation();

  // Check network connection with loading indication
  const checkConnection = async () => {
    setIsCheckingConnection(true);
    const state = await NetInfo.fetch();

    setTimeout(() => {
      setIsConnected(state.isConnected);
      setIsCheckingConnection(false);

      if (state.isConnected) {
        navigation.navigate("Slides");
      }
    }, 2000);
  };

  // Animation to slide the logo in from the right
  const slideInImage = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setAnimationComplete(true);
    });
  };

  useEffect(() => {
    slideInImage();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Inside useEffect after slide animation
  useEffect(() => {
    if (animationComplete) {
      checkStoredCredentials(); // checks if you have already logged in
    }
  }, [animationComplete]);

  const checkStoredCredentials = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    const password = await AsyncStorage.getItem("userPassword");

    if (email && password) {
      navigation.replace("ProfileSelection"); // already signed in
    } else {
      checkConnection(); // call your existing function to continue
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={mylogo}
        resizeMode="contain"
        style={[styles.netlogo, { transform: [{ translateX: slideAnim }] }]}
      />

      {isCheckingConnection ? (
        // Loading spinner
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="red" />
          <Text style={styles.loadingText}>Checking network status...</Text>
        </View>
      ) : isConnected === false ? (
        // Error message and retry button if no connection
        <View style={styles.loaderContainer}>
          <Text style={styles.noConnectionText}>No Internet Connection</Text>
          <TouchableOpacity style={styles.button} onPress={checkConnection}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default StarterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
  },
  netlogo: {
    marginTop: 40,
    height: 300,
    width: 300,
    alignSelf: "center",
  },
  loaderContainer: {
    marginTop: 1,
    alignItems: "center",
    padding: 10,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
  noConnectionText: {
    color: "#fff",
    fontSize: 18,
  },
  button: {
    marginTop: 10,
    width: 100,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
  },
});
