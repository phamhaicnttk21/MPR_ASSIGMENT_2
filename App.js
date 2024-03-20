import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './screens/CategoriesScreen';
import MealListScreen from './screens/MealListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="MealListScreen" component={MealListScreen} />
        {/* Add other screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
