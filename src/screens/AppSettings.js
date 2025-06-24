import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  FlatList,
  Modal,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";

const AppSettings = () => {
  const navigation = useNavigation();

  const [switchStates, setSwitchStates] = useState({
    notifications: false,
    wifionly: true,
  });
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
  const [downloadQuality, setDownloadQuality] = useState("Standard");
  const [downloadLocation, setDownloadLocation] = useState("Internal Storage");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleSwitch = (key) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const testInternetSpeed = () => {
    const speedTestUrl = "https://fast.com";
    Linking.openURL(speedTestUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const settingsOptions = [
    {
      section: "Video Playback",
      items: [
        {
          title: "Mobile Data Usage",
          subtitle: "Automatic",
          icon: "network-cell",
        },
      ],
    },
    {
      section: "Notifications",
      items: [
        { title: "Allow notifications", isSwitch: true, icon: "notifications" },
      ],
    },
    {
      section: "Downloads",
      items: [
        { title: "Wi-Fi Only", isSwitch: true, icon: "wifi" },
        { title: "Smart Downloads", icon: "download" },
        {
          title: "Download Video Quality",
          subtitle: downloadQuality,
          icon: "hd",
          onPress: () => setModalVisible(true),
        },
        {
          title: "Download Location",
          subtitle: downloadLocation,
          icon: "storage",
          onPress: () => setLocationVisible(true),
        },
      ],
    },
    {
      section: "About",
      items: [
        {
          title: "Device",
          subtitle:
            "Version: 8.137.0 build 4\nOS API: 34, arm64-v8a\nModel: 22120RN86G",
          icon: "smartphone",
        },
        {
          title: "Account",
          subtitle: "Email: jubrilo2007@gmail.com",
          icon: "account-circle",
        },
      ],
    },
    {
      section: "Diagnostics",
      items: [
        { title: "Check Network", icon: "network-check" },
        { title: "Playback Specification", icon: "play-circle-outline" },
        {
          title: "Internet Speed Test",
          icon: "speed",
          onPress: testInternetSpeed,
        },
      ],
    },
    {
      section: "Legal",
      items: [
        { title: "Open Source Licences", icon: "description" },
        { title: "Privacy", icon: "lock" },
        { title: "Cookie Preferences", icon: "cookie" },
        { title: "Terms of Use", icon: "gavel" },
      ],
    },
  ];

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={item.onPress}>
      <Icon name={item.icon} size={24} color="#fff" style={styles.icon} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        {item.subtitle && (
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      {item.isSwitch ? (
        <Switch
          value={switchStates[item.title.toLowerCase().replace(/\s/g, "")]}
          onValueChange={() =>
            handleToggleSwitch(item.title.toLowerCase().replace(/\s/g, ""))
          }
          thumbColor="#fff"
          trackColor={{ false: "#767577", true: "#f44336" }}
        />
      ) : (
        <Icon name="keyboard-arrow-right" size={24} color="#fff" />
      )}
    </TouchableOpacity>
  );

  const renderSection = ({ item }) => {
    const filteredItems = item.items.filter((settingItem) => {
      if (settingItem.title === "Mobile Data Usage") {
        return isConnected;
      }
      return true;
    });

    if (filteredItems.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{item.section}</Text>
        <FlatList
          data={filteredItems}
          renderItem={renderSettingItem}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const renderHeader = () => (
    <>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>App Settings</Text>
    </>
  );

  const renderQualityModal = () => (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Download Video Quality</Text>
          {["Standard", "High"].map((quality) => (
            <TouchableOpacity
              key={quality}
              style={styles.modalOption}
              onPress={() => {
                setDownloadQuality(quality);
                setModalVisible(false);
              }}
            >
              <Icon
                name={
                  downloadQuality === quality
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#fff"
              />
              <View style={styles.modalOptionText}>
                <Text style={styles.optionTitle}>{quality}</Text>
                <Text style={styles.optionSubtitle}>
                  {quality === "Standard"
                    ? "Downloads faster and uses less storage."
                    : "Uses more storage."}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCancel}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderLocationModal = () => (
    <Modal visible={locationVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Save to Phone</Text>
          {["Internal Storage", "Sd Card"].map((location) => (
            <TouchableOpacity
              key={location}
              style={styles.modalOption}
              onPress={() => {
                setDownloadLocation(location);
                setLocationVisible(false);
              }}
            >
              <Icon
                name={
                  downloadLocation === location
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#fff"
              />
              <View style={styles.modalOptionText}>
                <Text style={styles.optionTitle}>{location}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setLocationVisible(false)}>
            <Text style={styles.modalCancel}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <FlatList
        style={styles.container}
        data={settingsOptions}
        renderItem={renderSection}
        keyExtractor={(item, index) => `${item.section}-${index}`}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          <>
            {renderQualityModal()}
            {renderLocationModal()}
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 50,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 53,
    left: 0,
    zIndex: 1,
  },
  sectionContainer: {
    marginTop: 70,
  },
  sectionTitle: {
    color: "#b3b3b3",
    fontSize: 16,
    marginBottom: 5,
  },
  itemContainer: {
    backgroundColor: "#1f1f1f",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    color: "#fff",
    fontSize: 16,
  },
  itemSubtitle: {
    color: "#b3b3b3",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  modalOptionText: {
    marginLeft: 15,
  },
  optionTitle: {
    color: "#fff",
    fontSize: 16,
  },
  optionSubtitle: {
    color: "#b3b3b3",
    fontSize: 14,
  },
  modalCancel: {
    color: "#f44336",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default AppSettings;
