import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/welcome/index";
import LoginScreen from "../screens/login/index";
import RegisterScreen from "../screens/register/index";

const { Navigator, Screen } = createStackNavigator();

function AuthNavigator() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
