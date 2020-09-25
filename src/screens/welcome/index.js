import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import Icon from "react-native-vector-icons/FontAwesome";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text
          h4
          style={{
            color: Colors.SECONDARY,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
          }}
        >
          Kariyer App'e hoşgeldiniz.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Login")}
          icon={
            <Icon
              name="sign-in"
              size={15}
              color={Colors.PRIMARY}
              style={{ marginRight: 5 }}
            />
          }
          buttonStyle={{
            marginHorizontal: Spacing.SCALE_8,
            borderColor: Colors.PRIMARY,
          }}
          titleStyle={{
            color: Colors.PRIMARY,
          }}
          type="outline"
          title="Giriş Yap"
        />
        <Button
          onPress={() => navigation.navigate("Register")}
          icon={
            <Icon
              name="user-plus"
              size={15}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          buttonStyle={{
            marginHorizontal: Spacing.SCALE_8,
            borderColor: Colors.PRIMARY,
          }}
          title="Kayıt Ol"
        />
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
  },
  headingContainer: {
    marginBottom: Mixins.WINDOW_WIDTH / 12,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
