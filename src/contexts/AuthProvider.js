import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user == null) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
