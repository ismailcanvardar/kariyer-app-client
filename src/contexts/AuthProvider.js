import React, { useState, useEffect, createContext } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [employerId, setEmployerId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProvince, setUserProvince] = useState(null);
  const [userDistrict, setUserDistrict] = useState(null);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user == null) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
      const savedUser = JSON.parse(user);
      setUserToken(savedUser.token);
      setUserRole(savedUser.role);
      setUserProvince(savedUser.province);
      setUserDistrict(savedUser.district);
      setEmployeeId(savedUser.employeeId);
      setEmployerId(savedUser.employerId);
    }
  };

  const saveUser = async (data, role) => {
    console.log(data);
    const user = {
      token: data.token,
      role,
      province: data.province,
      district: data.district,
      employeeId: data.employeeId,
      employerId: data.employerId,
    };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setIsUserLoggedIn(true);
    setUserToken(data.token);
    setUserRole(role);
    setUserProvince(data.province);
    setUserDistrict(data.district);
    setEmployerId(data.employerId);
    setEmployeeId(data.employeeId);
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("user");
    setIsUserLoggedIn(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        userToken,
        userRole,
        userProvince,
        userDistrict,
        employerId,
        employeeId,
        saveUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
