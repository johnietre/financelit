import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen';
import CoursesScreen from './CoursesScreen';
import BudgetScreen from './BudgetScreen';
import AdvisingScreen from './AdvisingScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#45ab43" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#45ab43",
            headerStyle: { backgroundColor: "#45ab43" },
            headerTitleStyle: { color: "white" },
            tabBarIcon: ({ focused, color, size }) => {
              //let name;
              let iconName: keyof typeof Ionicons.glyphMap;
              switch (route.name) {
                case "Home":
                  iconName = focused ? "home" : "home-outline"; break;
                case "Budget":
                  iconName = focused ? "calculator" : "calculator-outline"; break;
                case "Advising":
                  iconName = focused ? "person" : "person-outline"; break;
                case "Profile":
                  iconName = focused ? "person-circle" : "person-circle-outline"; break;
                default:
                  iconName = focused ? "book" : "book-outline"; break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Courses" component={CoursesScreen} />
          <Tab.Screen name="Budget" component={BudgetScreen} />
          <Tab.Screen name="Advising" component={AdvisingScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
