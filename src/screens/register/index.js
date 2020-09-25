import React, { useState } from "react";
import Constants from "expo-constants";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  ButtonGroup,
  Text,
  Input,
  Divider,
  Button,
} from "react-native-elements";
import { Colors, Spacing, Typography, Mixins } from "../../styles/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";

const buttons = ["İşveren", "Çalışan"];

function RegisterScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [address, setAddress] = useState("");

  const updateSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
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
        {selectedIndex !== -1 && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.registerContainer}>
              <View style={styles.registerBlock}>
                <Input
                  value={name}
                  placeholder={
                    selectedIndex === 0 ? "İşveren Adı" : "Çalışan Adı"
                  }
                  onChange={(text) => setName(text)}
                />
                <Input
                  value={surname}
                  placeholder={
                    selectedIndex === 0 ? "İşveren Soyadı" : "Çalışan Soyadı"
                  }
                  onChange={(text) => setSurname(text)}
                />
                <Input
                  value={email}
                  placeholder="Eposta"
                  onChange={(text) => setEmail(text)}
                />
                <Input
                  value={phone}
                  placeholder="Telefon"
                  onChange={(text) => setPhone(text)}
                />
                <Input
                  value={address}
                  placeholder="Adres"
                  onChange={(text) => setAddress(text)}
                />
                <Input
                  value={password}
                  placeholder="Şifre"
                  secureTextEntry={true}
                  onChange={(text) => setPassword(text)}
                />
                <Input
                  value={passwordRepeat}
                  placeholder="Şifre Tekrar"
                  secureTextEntry={true}
                  onChange={(text) => setPasswordRepeat(text)}
                />
              </View>
            </View>
          </>
        )}
        {selectedIndex !== -1 && (
          <View style={styles.buttonContainer}>
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
              containerStyle={{
                paddingBottom: 2,
              }}
              title={
                selectedIndex == 0
                  ? "İşveren Olarak Kayıt Ol"
                  : "Çalışan Olarak Kayıt Ol"
              }
            />
            <Button
              onPress={() => navigation.navigate("Login")}
              buttonStyle={{
                marginHorizontal: Spacing.SCALE_8,
                borderColor: Colors.PRIMARY,
              }}
              containerStyle={{
                paddingBottom: 2,
              }}
              titleStyle={{
                color: Colors.PRIMARY,
              }}
              type="clear"
              title="Zaten kayıtlı mısınız?"
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  registerContainer: {
    flex: 1,
    alignItems: "center",
  },
  registerBlock: {
    flex: 1,
    width: Mixins.WINDOW_WIDTH / 1.2,
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.SCALE_18,
  },
  divider: {
    marginVertical: Spacing.SCALE_8,
    marginHorizontal: Spacing.SCALE_12,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
