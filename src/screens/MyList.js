import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import outerBanks from "../assets/images/outerbanks.jpeg";
import prisonBreak from "../assets/images/prison.jpeg";
import fla from "../assets/images/flash.jpeg";
import the from "../assets/images/the100.jpeg";
import nun from "../assets/images/nun.jpeg";
import far from "../assets/images/farming.jpeg";
import int from "../assets/images/into.jpeg";
import wit from "../assets/images/witcher.jpeg";
import nit from "../assets/images/night.jpeg";
import pic from "../assets/images/walkingdead.jpeg";

export const dummyList = [
  { id: "1", title: "Outer Banks", image: outerBanks },
  { id: "2", title: "Prison Break", image: prisonBreak },
  { id: "3", title: "The Flash", image: fla },
  { id: "4", title: "The 100", image: the },
  { id: "5", title: "Farming Simulator 23", image: far },
  { id: "6", title: "Into the Dead 2", image: int },
  { id: "7", title: "The Warrior Nun", image: nun },
  { id: "8", title: "The Walking Dead", image: pic },
  { id: "9", title: "The Witcher", image: wit },
  { id: "10", title: "The Night Agent", image: nit },
];

const MyList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    setMovieList(dummyList); // Set movieList directly to dummyList
  }, []);

  const removeMovie = (id) => {
    const updatedList = movieList.filter((movie) => movie.id !== id);
    setMovieList(updatedList);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movieList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image source={item.image} style={styles.movieImage} />
            <View style={styles.movieInfo}>
              <Text style={styles.movieText}>{item.title}</Text>
              <TouchableOpacity onPress={() => removeMovie(item.id)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  movieImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
    justifyContent: "center",
  },
  movieText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  removeButton: {
    color: "#e50914",
    fontSize: 14,
  },
});

export default MyList;
