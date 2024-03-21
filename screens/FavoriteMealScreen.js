import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MEALS } from '../data/dummy-data';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoriteMealScreen = ({ route, navigation }) => {
  // Get the initial list of favorite meal IDs from navigation parameters
  const { favoriteMealIds } = route.params;

  // Set up state for the favorite meals based on the meal IDs
  const [favoriteMeals, setFavoriteMeals] = useState(
    MEALS.filter(meal => favoriteMealIds && favoriteMealIds.includes(meal.id))
  );

  // Function to remove a meal from the favorites list
  const removeFavorite = (mealId) => {
    // Filter out the meal to remove
    const updatedFavoriteMeals = favoriteMeals.filter(meal => meal.id !== mealId);
    // Update the state to reflect the change
    setFavoriteMeals(updatedFavoriteMeals);
    // Update the navigation params to reflect the change (optional)
    navigation.setParams({
      favoriteMealIds: updatedFavoriteMeals.map(meal => meal.id),
    });
  };

  // Render function for each item in the favorites list
  const renderFavoriteItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
      <Text style={styles.mealTitle}>{item.title}</Text>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => removeFavorite(item.id)}
      >
        <Icon name="remove-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  // Render the screen, including the FlatList of favorite meals
  return (
    <View style={styles.screen}>
      {favoriteMeals.length > 0 ? (
        <FlatList
          data={favoriteMeals}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFavoriteItem}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites added yet.</Text>
      )}
    </View>
  );
};

// Styles for the FavoriteMealScreen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  mealItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flexShrink: 1,
  },
  iconContainer: {
    padding: 10,
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FavoriteMealScreen;
