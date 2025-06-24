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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";

const ManageProfiles = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isEditingMode, setIsEditingMode] = useState(true);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  useEffect(() => {
    loadProfiles();
  }, []);

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

  const saveProfiles = async (updatedProfiles) => {
    try {
      await AsyncStorage.setItem("profiles", JSON.stringify(updatedProfiles));
      setProfiles(updatedProfiles); // Updates state after saving
    } catch (error) {
      console.error("Failed to save profiles:", error);
    }
  };

  const handleAddOrEditProfile = (profile = null) => {
    if (profile) {
      setNewProfileName(profile.name);
      setSelectedImage(profile.image);
      setEditingProfile(profile.id);
    } else {
      setNewProfileName("");
      setSelectedImage(null);
      setEditingProfile(null);
    }
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        setSelectedImage(response.assets[0].uri);
        setModalVisible(true);
      }
    });
  };

  const handleSaveProfile = () => {
    if (newProfileName && selectedImage) {
      let updatedProfiles;
      if (editingProfile) {
        updatedProfiles = profiles.map((profile) =>
          profile.id === editingProfile
            ? { ...profile, name: newProfileName, image: selectedImage }
            : profile
        );
      } else {
        updatedProfiles = [
          ...profiles,
          {
            id: Date.now().toString(), // Unique ID based on timestamp
            name: newProfileName,
            image: selectedImage,
          },
        ];
      }
      saveProfiles(updatedProfiles);
      setNewProfileName("");
      setSelectedImage(null);
      setModalVisible(false);
    }
  };

  const confirmDeleteProfile = (id) => {
    setProfileToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteProfile = () => {
    const updatedProfiles = profiles.filter(
      (profile) => profile.id !== profileToDelete
    );
    saveProfiles(updatedProfiles);
    setDeleteModalVisible(false);
    setProfileToDelete(null);
  };

  const renderProfile = ({ item }) => (
    <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.profileBox}>
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
              onPress={() => confirmDeleteProfile(item.id)}
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Manage Profiles</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...profiles, { id: "add", name: "Add Profile" }]}
        renderItem={({ item }) =>
          item.id === "add" ? (
            <TouchableOpacity
              style={styles.addBox}
              onPress={() => handleAddOrEditProfile()}
            >
              <Icon name="plus" size={40} color="#fff" />
            </TouchableOpacity>
          ) : (
            renderProfile({ item })
          )
        }
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.profileList}
      />

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

      <Modal visible={isDeleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete this profile?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={handleDeleteProfile}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>No</Text>
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
    textAlign: "center",
    flex: 1,
  },
  doneButton: {
    fontSize: 18,
    color: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    margin: 10,
    flex: 1,
  },
  profileBox: {
    width: 150,
    height: 150,
    backgroundColor: "#333",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    marginBottom: 10,
    marginHorizontal: 10,
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
  addBox: {
    width: 150,
    height: 150,
    backgroundColor: "#555",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#e50914",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#666",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ManageProfiles;
