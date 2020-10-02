import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
import Constants from "expo-constants";
import { Colors, Spacing, Typography, Mixins } from "../../styles/index";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar
        round
        lightTheme
        placeholder="İlan, işveren veya çalışan ara..."
        onChangeText={(text) => console.log(text)}
        value={"hi"}
        containerStyle={{
          backgroundColor: Colors.BACKGROUND,
        }}
        inputContainerStyle={{
          backgroundColor: Colors.WHITE,
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.BACKGROUND,
  },
});
