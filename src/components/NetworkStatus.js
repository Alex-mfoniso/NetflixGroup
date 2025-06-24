import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const previousState = useRef(true); // Track the previous network state

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== previousState.current) {
        setIsConnected(state.isConnected);
        previousState.current = state.isConnected; //compares the new status to prev

        // Show the modal with fade-in effect
        setShowModal(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Fade-out effect and hide the modal after a delay
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => setShowModal(false)); //render nothing
          }, 2000);
        });
      }
    });

    return () => unsubscribe();
  }, [fadeAnim]);

  if (!showModal) return null; //if true show modal

  return (
    <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
      <Text style={styles.text}>
        {isConnected ? "Connected" : "No Internet Connection"}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default NetworkStatus;
