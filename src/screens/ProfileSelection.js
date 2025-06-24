import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const ProfileSelection = () => {
  const navigation = useNavigation();

  // 🔹 State for profiles and modal control
  const [profiles, setProfiles] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    loadProfiles(); // 🔸 Load profiles when component mounts
  }, []);

  // 🔹 Load saved profiles from AsyncStorage
  const loadProfiles = async () => {
    try {
      const storedProfiles = await AsyncStorage.getItem("profiles");
      if (storedProfiles) {
        setProfiles(JSON.parse(storedProfiles));
      }
    } catch (error) {
      console.error("Failed to load profiles:", error);
    }
  };

  // 🔹 Save updated profiles to AsyncStorage
  const saveProfiles = async (updatedProfiles) => {
    try {
      await AsyncStorage.setItem("profiles", JSON.stringify(updatedProfiles));
    } catch (error) {
      console.error("Failed to save profiles:", error);
    }
  };

  // 🔹 Add or Edit a profile with image selection
  const handleAddOrEditProfile = async (profile = null) => {
    if (profile) {
      setNewProfileName(profile.name);
      setSelectedImage(profile.image);
      setEditingProfile(profile.id);
    } else {
      setNewProfileName("");
      setSelectedImage(null);
      setEditingProfile(null);
    }

    // 🔸 Ask for permission to access gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // 🔸 Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setModalVisible(true); // 🔸 Show modal to enter profile name
    }
  };

  // 🔹 Save new or edited profile to state and AsyncStorage
  const handleSaveProfile = () => {
    if (newProfileName && selectedImage) {
      let updatedProfiles;

      // 🔸 Update existing profile
      if (editingProfile) {
        updatedProfiles = profiles.map((profile) =>
          profile.id === editingProfile
            ? { ...profile, name: newProfileName, image: selectedImage }
            : profile
        );
      } else {
        // 🔸 Add new profile
        updatedProfiles = [
          ...profiles,
          {
            id: profiles.length + 1,
            name: newProfileName,
            image: selectedImage,
          },
        ];
      }

      setProfiles(updatedProfiles);
      saveProfiles(updatedProfiles);
      setNewProfileName("");
      setSelectedImage(null);
      setModalVisible(false);
    }
  };

  // 🔹 Delete a selected profile
  const handleDeleteProfile = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
  };

  // 🔹 Toggle edit mode (show edit/delete buttons)
  const toggleEditingMode = () => {
    setIsEditingMode(!isEditingMode);
  };

  // 🔹 Navigate to Home with selected profile
  const navigateToHome = async (selectedProfile) => {
    try {
      await AsyncStorage.setItem("profile", JSON.stringify(selectedProfile));
      navigation.navigate("Home"); // Go to Home screen
    } catch (error) {
      console.error("Failed to save selected profile:", error);
    }
  };

  // 🔹 Render each profile box
  const renderProfile = ({ item }) => (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        style={styles.profileBox}
        onPress={() => !isEditingMode && navigateToHome(item)}
      >
        <Image source={{ uri: item.image }} style={styles.profileImage} />
        {isEditingMode && (
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleAddOrEditProfile(item)}
            >
              <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDeleteProfile(item.id)}
            >
              <Icon name="trash" size={20} color="#e50914" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.profileName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔸 Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Who's Watching?</Text>
        <TouchableOpacity onPress={toggleEditingMode}>
          <Text style={styles.editButton}>
            {isEditingMode ? "Done" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔸 Profile List with Add button */}
      <FlatList
        data={[...profiles, { id: "add", name: "Add Profile" }]}
        renderItem={({ item }) =>
          item.id === "add" ? (
            <View style={styles.profileContainer}>
              <TouchableOpacity
                style={styles.profileBox}
                onPress={() => handleAddOrEditProfile()}
              >
                <View style={styles.addIconWrapper}>
                  <Icon name="plus" size={40} color="#fff" />
                </View>
              </TouchableOpacity>
              <Text style={styles.profileName}>Add Profile</Text>
            </View>
          ) : (
            renderProfile({ item })
          )
        }
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

      {/* 🔸 Modal for creating/editing profile */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Profile Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Profile Name"
              placeholderTextColor="#999"
              value={newProfileName}
              onChangeText={setNewProfileName}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={handleSaveProfile}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>
                  {editingProfile ? "Save Changes" : "Add Profile"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 50,
  },
  headerText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    fontSize: 18,
    color: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%", // was flex: 1
    margin: 10,
  },
  profileBox: {
    width: "100%",
    aspectRatio: 1, // maintain square shape on all devices
    backgroundColor: "#333",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    marginBottom: 10,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconButton: {
    marginHorizontal: 10,
  },
  profileName: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    marginTop: 8,
  },
  addIconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  addBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#555",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#555",
    color: "#fff",
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#e50914",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    borderColor: "#e50914",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  cancelButtonText: {
    color: "#e50914",
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileSelection;
