import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    const TMDB_API_KEY = "f55dd2e477072e110c23bb7e6898129b"; // Replace with your actual TMDB API key
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setMovies(result.results); // 'results' contains the list of movies from TMDB
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch movies. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          placeholderTextColor="gray"
          value={query}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={fetchMovies} // Trigger fetch on Enter
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.poster}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "white",
  },
  movieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 4,
    marginRight: 16,
  },
  title: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
});

export default Search;
