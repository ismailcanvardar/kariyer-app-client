import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { AuthContext } from "../../contexts/AuthProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

function SearchScreen() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <TouchableOpacity onPress={() => logoutUser()}>
        <Text>Çık</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.BACKGROUND,
  },
});
