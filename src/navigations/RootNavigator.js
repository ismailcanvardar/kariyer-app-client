import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import SplashScreen from "../screens/splash/index";
import BottomNavigator from "./BottomNavigator";
import AuthNavigator from "./AuthNavigator";

const RootNavigator = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  if (isUserLoggedIn == null) {
    return <SplashScreen />;
  }

  return isUserLoggedIn == true ? <BottomNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
