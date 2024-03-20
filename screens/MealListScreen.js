import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { MEALS } from "../data/dummy-data"; // Make sure this import path is correct
import { useState,useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {useNavigation} from '@react-navigation/native-stack';

const MealItem = ({ meal, onSelectMeal, isFavorite, toggleFavorite }) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={() => onSelectMeal(meal)}>
        <Image source={{ uri: meal.imageUrl }} style={styles.mealImage} />
        <View style={styles.mealDetail}>
          <Text style={styles.mealTitle}>{meal.title}</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => toggleFavorite(meal.id)}
          >
            <Icon
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MealListScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (mealId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(mealId)) {
        // Remove from favorites
        return currentFavorites.filter((id) => id !== mealId);
      } else {
        // Add to favorites
        return [...currentFavorites, mealId];
      }
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('FavoriteMealScreen', { favorites })}
        >
          <Icon name="favorite" size={24} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, favorites]);

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        meal={itemData.item}
        onSelectMeal={() =>
          navigation.navigate("MealDetailsScreen", { mealId: itemData.item.id })
        }
        toggleFavorite={() => toggleFavorite(itemData.item.id)}
        isFavorite={favorites.includes(itemData.item.id)}
      />
    );
  };

  return (
    <FlatList
      data={MEALS}
      renderItem={renderMealItem}
      keyExtractor={(item) => item.id.toString()} // Ensure .toString() is called in case ids are not strings
      style={styles.screen}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mealItem: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
  },
  mealImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  mealDetail: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mealCategory: {
    fontSize: 14,
    color: "#666",
  },
  headerButton: {
    color: 'red', // Color of your choice
    paddingHorizontal: 10, // Adjust the padding as needed
    fontSize: 18, // Adjust font size as needed
  },
});

export default MealListScreen;
