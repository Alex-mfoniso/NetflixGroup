import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import pic from "../assets/images/walkingdead.jpeg";
import { tvShows, games, trendingMovies } from "../components/Data";
import NewHot from "./NewHot";
import MyNetflix from "./MyNetflix";

const Tab = createBottomTabNavigator();

// Home Screen Content
function Home({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Text style={styles.title}>Welcome</Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate("Download")}>
            <Icon
              name="download-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon
              name="search-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroller} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollwrapper}>
          <View style={styles.bigFrames}>
            <Image source={pic} style={styles.bannerpic} />
            {/* Gradient Overlay on Image */}
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              style={styles.header}
            >
              <View style={styles.headContent}>
                <View style={styles.logoHolder}></View>
                <View style={styles.headBtnHolder}></View>
              </View>
            </LinearGradient>
            {/* Genre Description and Buttons */}
            <View style={styles.contentWrapper}>
              <Text style={styles.genreText}>Horror • Violence • Sex</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.playButton}>
                  <Icon
                    name="play"
                    size={20}
                    color="black"
                    style={styles.playIcon}
                  />
                  <Text style={styles.playText}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.myListButton}>
                  <Icon
                    name="add"
                    size={20}
                    color="white"
                    style={styles.addIcon}
                  />
                  <Text style={styles.myListText}>My List</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>US TV Action & Adventure</Text>
        <FlatList
          data={tvShows}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Mobile Games</Text>
        <FlatList
          data={games}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Trending Movies</Text>
        <FlatList
          data={trendingMovies}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
}

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Homepage") {
            iconName = "home-outline";
          } else if (route.name === "New & Hot") {
            iconName = "flame-outline";
          } else if (route.name === "My Netflix") {
            iconName = "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#000" },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Homepage" component={Home} />
      <Tab.Screen name="New & Hot" component={NewHot} />
      <Tab.Screen name="My Netflix" component={MyNetflix} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#141414",
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
  },
  scroller: {
    width: "100%",
    backgroundColor: "black",
  },
  scrollwrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  bigFrames: {
    width: "98%",
    height: 400,
    backgroundColor: "whitesmoke",
    marginTop: 20,
    position: "relative",
  },
  bannerpic: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  headContent: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  contentWrapper: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 2,
  },
  genreText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  playText: {
    color: "black",
    fontSize: 16,
    marginLeft: 5,
  },
  myListButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  myListText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  sectionTitle: { color: "white", fontSize: 18, marginLeft: 10, marginTop: 20 },
  itemContainer: { margin: 10 },
  itemImage: { width: 120, height: 180, borderRadius: 8 },
  itemText: { color: "#fff", textAlign: "center", marginTop: 5 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
