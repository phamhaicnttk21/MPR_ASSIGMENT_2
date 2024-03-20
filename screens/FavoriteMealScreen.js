import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MEALS } from '../data/dummy-data'; // Ensure this import is correct
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoriteMealScreen = ({ route }) => {
    const { favorites: favoriteMealIds } = route.params;
    const [favoriteMeals, setFavoriteMeals] = useState(
      MEALS.filter((meal) => favoriteMealIds.includes(meal.id))
    );
  
    // Function to remove a meal from favorites
    const removeFavorite = (mealId) => {
      setFavoriteMeals((currentFavorites) =>
        currentFavorites.filter((meal) => meal.id !== mealId)
      );
    };

  const renderFavoriteItem = ({ item }) => {
    return (
      <View style={styles.mealItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
        <View style={styles.mealDetail}>
          <Text style={styles.mealTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.iconContainer}>
            <Icon name="remove-circle" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {favoriteMeals.length > 0 ? (
        <FlatList 
          data={favoriteMeals}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFavoriteItem}
        />
      ) : (
        <Text>No favorites added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  mealImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  mealDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 5,
  },
});

export default FavoriteMealScreen;