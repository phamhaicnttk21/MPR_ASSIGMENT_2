import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MEALS } from '../data/dummy-data'; // Ensure this import is correct
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoriteMealScreen = ({ route }) => {
  // Get the favorite meal IDs from the navigation parameter
  const { favoriteMealIds } = route.params;

  // Set up state for the favorite meals
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  // When the component mounts or favoriteMealIds changes, update favoriteMeals
  useEffect(() => {
    if (favoriteMealIds) {
      const updatedFavoriteMeals = MEALS.filter((meal) => 
        favoriteMealIds.includes(meal.id)
      );
      setFavoriteMeals(updatedFavoriteMeals);
    }
  }, [favoriteMealIds]);

  // Render each favorite meal item
  const renderFavoriteItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
      <Text style={styles.mealTitle}>{item.title}</Text>
      {/* Optionally add functionality to remove from favorites */}
    </View>
  );

  // Render the flat list of favorite meals
  return (
    <View style={styles.screen}>
      {favoriteMeals.length > 0 ? (
        <FlatList
          data={favoriteMeals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  list: {
    width: '100%', // Ensure the FlatList takes up the full width
  },
  mealItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
  },
  mealImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: 'center',
  },
  // Add styles for iconContainer if you add remove functionality
});

export default FavoriteMealScreen;
