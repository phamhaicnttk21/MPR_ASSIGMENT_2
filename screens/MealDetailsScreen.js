import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { MEALS } from '../data/dummy-data'; // Make sure this import path is correct

const MealDetailsScreen = ({ route }) => {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  if (!selectedMeal) {
    return (
      <View style={styles.screen}>
        <Text>Meal not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View style={styles.details}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.subtitle}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <Text key={ingredient} style={styles.text}>{ingredient}</Text>
      ))}
      <Text style={styles.subtitle}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <Text key={step} style={styles.text}>{step}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    marginBottom:20
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default MealDetailsScreen;
