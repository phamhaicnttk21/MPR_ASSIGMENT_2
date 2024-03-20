import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './screens/CategoriesScreen';
import MealListScreen from './screens/MealListScreen';
import MealDetailsScreen from './screens/MealDetailsScreen'; // Import MealDetailsScreen
import FavoriteMealScreen from './screens/FavoriteMealScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="MealListScreen" component={MealListScreen} />
        <Stack.Screen name="MealDetailsScreen" component={MealDetailsScreen} />
        {/* Ensure there are no other elements or comments here */}
        <Stack.Screen name="FavoriteMealScreen" component={FavoriteMealScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
