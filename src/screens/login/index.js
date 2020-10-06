import React, { useState, useEffect, useContext } from "react";
import Constants from "expo-constants";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  ButtonGroup,
  Text,
  Input,
  Divider,
  Button,
} from "react-native-elements";
import { Colors, Spacing, Typography, Mixins } from "../../styles/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../contexts/AuthProvider";
import { loginEmployee } from "../../api/employees";
import { loginEmployer, registerEmployer } from "../../api/employers";

const buttons = ["İşveren", "Çalışan"];

function LoginScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const { saveUser } = useContext(AuthContext);

  const updateSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  const removeInputTexts = () => {
    setEmail("");
    setPassword("");
    setLoginError(false);
  };

  const login = () => {
    if (selectedIndex === 0) {
      loginEmployer(
        { email, password },
        (data) => {
          const userData = data.data;
          console.log(data.data);
          saveUser(userData, "employer");
          // console.log(data.data.token);
        },
        (err) => {
          // console.log(err.response.data);
          if (err.response.data.title === "Wrong Credentials") {
            setLoginError(true);
          }
        }
      );
    } else if (selectedIndex === 1) {
      loginEmployee(
        { email, password },
        (data) => {
          const userData = data.data;
          saveUser(userData, "employee");
          console.log(data.data.token);
        },
        (err) => {
          console.log(err.response.data);
          if (err.response.data.title === "Wrong Credentials") {
            setLoginError(true);
          }
        }
      );
    }
  };

  useEffect(() => {
    removeInputTexts();
  }, [selectedIndex]);

  return (
    <View style={styles.container}>
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
          <View style={styles.registerContainer}>
            <View style={styles.registerBlock}>
              <Input
                value={email}
                placeholder="Eposta"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                errorMessage={
                  loginError === true ? "Eposta veya şifreniz yanlış." : ""
                }
              />
              <Input
                value={password}
                placeholder="Şifre"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="oneTimeCode"
              />
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => login()}
                  icon={
                    <Icon
                      name="sign-in"
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
                      ? "İşveren Olarak Giriş Yap"
                      : "Çalışan Olarak Giriş Yap"
                  }
                />
                <Button
                  onPress={() => navigation.navigate("Register")}
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
                  title="Kayıtlı değil misiniz?"
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.SCALE_18,
  },
  registerContainer: {
    flex: 1,
    alignItems: "center",
  },
  registerBlock: {
    flex: 1,
    width: Mixins.WINDOW_WIDTH / 1.2,
  },
});
