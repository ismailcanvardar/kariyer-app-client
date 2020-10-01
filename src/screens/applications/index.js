import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";

function ApplicationsScreen() {
  return (
    <View style={styles.container}>
      <Text>Apps</Text>
    </View>
  );
}

export default ApplicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.BACKGROUND,
  },
});
