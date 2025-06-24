import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dummyList } from "./MyList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native"; // ✅ Add this

const MyNetflix = ({ navigation }) => {
  const [profile, setProfile] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isSignOutModalVisible, setSignOutModalVisible] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const drawerOptions = [
    {
      id: "1",
      name: "Manage Profile",
      icon: "user-cog",
      screen: "ManageProfiles",
    },
    { id: "2", name: "App Settings", icon: "cog", screen: "AppSettings" },
    { id: "3", name: "Account", icon: "user-circle", screen: null },
    { id: "4", name: "Sign Out", icon: "sign-out-alt", action: "signOut" },
    {
      id: "5",
      name: "Version 18.43.0 {40183}",
      icon: "info-circle",
      screen: null,
    },
  ];

  // ✅ Refresh when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadProfileAndMovies = async () => {
        const storedProfiles = await AsyncStorage.getItem("profile");
        if (storedProfiles) {
          setProfile(JSON.parse(storedProfiles));
        }
        setMovieList(dummyList);
      };

      loadProfileAndMovies();
    }, [])
  );

  const handleDrawerItemPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else if (item.action === "signOut") {
      setSignOutModalVisible(true);
    }
    setDrawerVisible(false);
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.setItem("sessionUpdated", "true");
      await AsyncStorage.setItem("lastSignOutTime", new Date().toISOString());
      setSignOutModalVisible(false);
      navigation.navigate("Slides");
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Netflix</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Icon name="search" size={20} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDrawerVisible(true)}>
              <Icon name="bars" size={20} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {profile?.image ? (
            <Image
              source={{ uri: profile.image }}
              style={styles.profileImage}
            />
          ) : (
            <Icon name="user-circle" size={60} color="#fff" />
          )}
          <Text style={styles.profileName}>{profile?.name || "Guest"}</Text>
        </View>

        {/* My List Section */}
        <View style={styles.myListContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => navigation.navigate("MyList")}
          >
            <Icon
              name="list"
              size={20}
              color="#3498db"
              style={styles.iconLeft}
            />
            <Text style={styles.myListHeader}>My List</Text>
            <Icon
              name="chevron-right"
              size={16}
              color="#fff"
              style={styles.iconRight}
            />
          </TouchableOpacity>
          {movieList.length > 0 ? (
            <FlatList
              data={movieList.slice(0, 5)}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.movieItem}>
                  {item.image ? (
                    <Image source={item.image} style={styles.movieImage} />
                  ) : (
                    <Text style={styles.movieText}>No Image</Text>
                  )}
                  <Text style={styles.movieText}>{item.title}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyText}>Your list is empty</Text>
          )}
        </View>

        {/* Downloads */}
        <View style={styles.downloadContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => navigation.navigate("Download")}
          >
            <Icon
              name="download"
              size={20}
              color="#3498db"
              style={styles.iconLeft}
            />
            <Text style={styles.downloadHeader}>Downloads</Text>
            <Icon
              name="chevron-right"
              size={16}
              color="#fff"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.notificationContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Icon
              name="bell"
              size={20}
              color="#3498db"
              style={styles.iconLeft}
            />
            <Text style={styles.notificationHeader}>Notifications</Text>
            <Icon
              name="chevron-right"
              size={16}
              color="#fff"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* Drawer Modal */}
        <Modal
          visible={isDrawerVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setDrawerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.drawerContent}>
              <FlatList
                data={drawerOptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.drawerItemContainer}>
                    <TouchableOpacity
                      style={styles.drawerItem}
                      onPress={() => handleDrawerItemPress(item)}
                      disabled={!item.screen && !item.action}
                    >
                      <Icon
                        name={item.icon}
                        size={20}
                        color="white"
                        style={styles.drawerIcon}
                      />
                      <Text style={styles.drawerText}>{item.name}</Text>
                    </TouchableOpacity>
                    {item.name === "Manage Profile" && (
                      <TouchableOpacity
                        onPress={() => setDrawerVisible(false)}
                        style={styles.closeButton}
                      >
                        <Icon name="times" size={20} color="#fff" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Sign-Out Modal */}
        <Modal
          visible={isSignOutModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSignOutModalVisible(false)}
        >
          <View style={styles.signOutModalContainer}>
            <View style={styles.signOutModalContent}>
              <Text style={styles.signOutText}>
                Are you sure you want to sign out?
              </Text>
              <View style={styles.signOutButtonContainer}>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={styles.signOutButtonConfirm}
                >
                  <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSignOutModalVisible(false)}
                  style={styles.signOutButtonCancel}
                >
                  <Text style={styles.signOutButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#141414",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  profileContainer: {
    alignSelf: "center",
    marginTop: 40,
    padding: 5,
    width: 130,
    height: 160,
    backgroundColor: "#333",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  profileName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  myListContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconLeft: {
    marginRight: 10,
  },
  myListHeader: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  downloadContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  downloadHeader: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  iconRight: {
    marginLeft: "auto",
  },
  notificationContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  notificationHeader: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  movieItem: {
    alignItems: "center",
    marginRight: 10,
  },
  movieImage: {
    width: 150,
    height: 120,
    borderRadius: 5,
    marginBottom: 5,
  },
  movieText: {
    color: "#fff",
    textAlign: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawerContent: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  drawerIcon: {
    marginRight: 15,
  },
  drawerText: {
    color: "white",
    fontSize: 18,
    marginLeft: 15,
  },
  signOutModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  signOutModalContent: {
    width: "80%",
    backgroundColor: "#333",
    borderRadius: 10,
    borderColor: "rgba(229, 9, 20, 0.7)",
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
  },
  signOutText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  signOutButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  signOutButtonConfirm: {
    backgroundColor: "#e50914",
    padding: 10,
    borderRadius: 5,
  },
  signOutButtonCancel: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MyNetflix;
