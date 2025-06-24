import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import mylogo from "../assets/images/logo.png";

const HeaderTitle = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image source={mylogo} style={styles.logo} />
      </View>
      <View style={styles.headerLinksContainer}>
        <View style={styles.linkContainer}>
          <Pressable onPress={() => navigation.navigate("Privacy")}>
            <Text style={styles.headerLinkText}>Privacy</Text>
          </Pressable>
        </View>
        <View style={styles.linkContainer}>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.headerLinkText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 75,
    resizeMode: "contain",
  },
  headerLinksContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 50,
  },
  linkContainer: {
    marginLeft: 20,
  },
  headerLinkText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default HeaderTitle;
