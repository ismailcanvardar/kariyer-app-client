import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "../../styles/index";

function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Lütfen bekleyiniz...</Text>
      </View>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
  },
  textContainer: {
    paddingVertical: 24,
  },
});
