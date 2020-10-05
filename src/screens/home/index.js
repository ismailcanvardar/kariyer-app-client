import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { SearchBar, Text, Divider } from "react-native-elements";
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
      <View style={styles.searchBarBottom}>
        <Text h4 style={styles.heading}>
          Yakınımdaki İlanlar
        </Text>
        <Divider />
      </View>
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
  searchBarBottom: {
    // flex: 1,
    paddingHorizontal: Spacing.SCALE_12,
    marginTop: Spacing.SCALE_8,
  },
  heading: {
    color: Colors.SECONDARY,
    fontWeight: "bold",
    marginBottom: Spacing.SCALE_8,
  },
});
