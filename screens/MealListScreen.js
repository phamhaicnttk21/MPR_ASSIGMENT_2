import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { MEALS } from '../data/dummy-data'; // Make sure this import path is correct

const MealItem = ({ meal, onSelectMeal }) => {
  return (
    <TouchableOpacity onPress={() => onSelectMeal(meal)}>
      <View style={styles.mealItem}>
        <Image source={{ uri: meal.imageUrl }} style={styles.mealImage} />
        <View style={styles.mealDetail}>
          <Text style={styles.mealTitle}>{meal.title}</Text>
          {/* Ensure that categoryIds is an array of strings and is joined into a single string */}
          <Text style={styles.mealCategory}>{meal.categoryIds.join(', ')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MealListScreen = ({ route,navigation }) => {

    const catId = route.params.categoryId; // Get the categoryId from route params
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        meal={itemData.item}
        onSelectMeal={() => {
          navigation.navigate('MealDetailsScreen', {
            mealId: itemData.item.id,
          });
        }}
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
    backgroundColor: '#fff',
  },
  mealItem: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
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
  mealDetail: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealCategory: {
    fontSize: 14,
    color: '#666',
  },
});

export default MealListScreen;
