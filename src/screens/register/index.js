import React, { useState } from "react";
import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import { ButtonGroup, Text } from "react-native-elements";
import { Colors, Spacing, Typography } from "../../styles/index";

const buttons = ["İşveren", "Çalışan"];

function RegisterScreen() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const updateSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      {selectedIndex === -1 && (
        <View style={styles.headingContainer}>
          <Text
            h4
            style={{
              color: Colors.SECONDARY,
              fontWeight: Typography.FONT_WEIGHT_BOLD,
            }}
          >
            Lütfen üyelik tipini seçiniz.
          </Text>
        </View>
      )}
      <View style={styles.buttonGroupContainer}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          containerStyle={{ height: Spacing.SCALE_32 }}
          onPress={updateSelectedIndex}
        />
      </View>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingTop: Constants.statusBarHeight,
  },
  buttonGroupContainer: {
    flex: 1,
  },
  registerBlock: {},
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.SCALE_18,
  },
});
