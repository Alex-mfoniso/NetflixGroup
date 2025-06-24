import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const newHotMovies = [
  {
    id: "1",
    title: "Outer Banks",
    description: "Adventure, Mystery, and Teenage Drama.",
    image: require("../assets/images/outerbanks.jpeg"),
  },
  {
    id: "2",
    title: "Prison Break",
    description: "A brother's journey to save his wrongly accused sibling.",
    image: require("../assets/images/prison.jpeg"),
  },
  {
    id: "3",
    title: "The Flash",
    description: "A young man's journey to becoming a superhero.",
    image: require("../assets/images/flash.jpeg"),
  },
  {
    id: "4",
    title: "The Witcher",
    description: "Fantasy, Adventure, and Monsters.",
    image: require("../assets/images/witcher.jpeg"),
  },
  {
    id: "5",
    title: "Lost",
    description:
      "Survival story of stranded passengers on a mysterious island.",
    image: require("../assets/images/lost.jpeg"),
  },
];

export default function NewHot({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.movieCard}>
      <Image source={item.image} style={styles.movieImage} resizeMode="cover" />
      <View style={styles.textContent}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New & Hot</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Download")}>
            <Ionicons
              name="download-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons
              name="search-outline"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Movie List */}
      <FlatList
        data={newHotMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

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
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconRow: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  movieCard: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
  },
  movieImage: {
    width: 100,
    height: 140, // Explicit dimensions for image
  },
  textContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  movieTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieDescription: {
    color: "#ccc",
    fontSize: 14,
  },
});
