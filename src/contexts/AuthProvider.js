import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user == null) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
      const savedUser = JSON.parse(user);
      setUserToken(saveUser.token);
      setUserRole(saveUser.role);
    }
  };

  const saveUser = async (token, role) => {
    const user = { token, role };
    await AsyncStorage.setItem("user", user.toString());
    setIsUserLoggedIn(true);
    setUserToken(token);
    setUserRole(role);
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("user");
    setIsUserLoggedIn(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, saveUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
