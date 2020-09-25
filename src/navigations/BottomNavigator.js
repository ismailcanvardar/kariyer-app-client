import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/index";
import SearchScreen from "../screens/search/index";
import ProfileScreen from "../screens/profile/index";

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => (
  <Navigator>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Search" component={SearchScreen} />
    <Screen name="Profile" component={ProfileScreen} />
  </Navigator>
);

const BottomNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default BottomNavigator;
