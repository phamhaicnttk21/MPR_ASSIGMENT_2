import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';

// Calculate the dimensions for the grid items
const { width } = Dimensions.get('window');
const itemSize = width / 2; // We divide by 2 since there are 2 columns
const itemMargin = 10; // Margin between items

const CategoriesScreen = ({ navigation }) => {
  
  const renderCategoryItem = (itemData) => {
    return (
      <TouchableOpacity
        style={[styles.gridItem, { backgroundColor: itemData.color }]} // Assign background color from the item data
        onPress={() => navigation.navigate('MealListScreen', { categoryId: itemData.id })}
      >
        <Text style={styles.title}>{itemData.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.screenTitle}>Categories</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {CATEGORIES.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              {renderCategoryItem(item)}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Background color for the entire safe area
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // Space above and below the title
    marginTop:30
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff', // Background color for the ScrollView
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: itemMargin,
  },
  itemContainer: {
    width: itemSize - (itemMargin * 2),
    height: itemSize - (itemMargin * 2),
    marginBottom: itemMargin * 2, // Spacing between rows
  },
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Rounded corners
    // Shadows and elevation are optional for depth effect
    elevation: 3, // For Android shadow
    shadowColor: 'black', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Text color
  },
});

export default CategoriesScreen;