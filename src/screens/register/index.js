import React, { useState, useEffect } from "react";
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
import { registerEmployee } from "../../api/employees";
import { registerEmployer } from "../../api/employers";
import { sendVerificationEmail } from "../../api/emails";

const buttons = ["İşveren", "Çalışan"];

function RegisterScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [address, setAddress] = useState("");
  const [passwordsMatched, setPasswordsMatched] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [enteredVerificationCode, setEnteredVerificationCode] = useState("");
  const [verificationCodeMatched, setVerificationCodeMatched] = useState(null);
  const [emailError, setEmailError] = useState(false);

  const updateSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  const register = async () => {
    if (password === passwordRepeat) {
      setPasswordsMatched(true);
      if (selectedIndex === 0) {
        registerEmployer(
          { name, surname, email, phone, address, password },
          (data) => {
            setIsRegistered(true);
            sendVerificationEmail(
              email,
              (data) => {
                setVerificationCode(data.data.verificationCode);
              },
              (err) => console.log(err.response.data)
            );
          },
          (err) => {
            console.log(err.response.data);
            if (err.response.data.detail === "Email already in use.") {
              setEmailError(true);
            }
          }
        );
      } else if (selectedIndex === 1) {
        registerEmployee(
          { name, surname, email, phone, address, password },
          (data) => {
            setIsRegistered(true);
            sendVerificationEmail(
              email,
              (data) => {
                setVerificationCode(data.data.verificationCode);
                console.log(data.data.verificationCode);
              },
              (err) => console.log(err.response.data)
            );
          },
          (err) => {
            console.log(err.response.data);
            if (err.response.data.detail === "Email already in use.") {
              setEmailError(true);
            }
          }
        );
      }
    } else {
      setPasswordsMatched(false);
    }
  };

  const removeInputTexts = () => {
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setPassword("");
    setPasswordRepeat("");
    setAddress("");
    setPasswordsMatched(null);
  };

  const verifyCode = () => {
    if (verificationCode.toString() === enteredVerificationCode) {
      navigation.navigate("Login");
    } else {
      setVerificationCodeMatched(false);
    }
  };

  useEffect(() => {
    removeInputTexts();
  }, [selectedIndex]);

  return !isRegistered ? (
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
                  onChangeText={(text) => setName(text)}
                />
                <Input
                  value={surname}
                  placeholder={
                    selectedIndex === 0 ? "İşveren Soyadı" : "Çalışan Soyadı"
                  }
                  onChangeText={(text) => setSurname(text)}
                />
                <Input
                  value={email}
                  placeholder="Eposta"
                  onChangeText={(text) => setEmail(text)}
                  autoCapitalize="none"
                  errorMessage={
                    emailError === true
                      ? "Bu eposta ile önceden hesap oluşturulmuştur."
                      : ""
                  }
                />
                <Input
                  value={phone}
                  placeholder="Telefon"
                  onChangeText={(text) => setPhone(text)}
                  autoCapitalize="none"
                />
                <Input
                  value={address}
                  placeholder="Adres"
                  onChangeText={(text) => setAddress(text)}
                  autoCapitalize="none"
                />
                <Input
                  value={password}
                  placeholder="Şifre"
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                  errorMessage={
                    passwordsMatched === false ? "Şifreler eşleşmedi." : ""
                  }
                />
                <Input
                  value={passwordRepeat}
                  placeholder="Şifre Tekrar"
                  secureTextEntry={true}
                  onChangeText={(text) => setPasswordRepeat(text)}
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                />
              </View>
            </View>
          </>
        )}
        {selectedIndex !== -1 && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => register()}
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
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: Mixins.WINDOW_HEIGHT / 3,
        }}
      >
        <View style={styles.registerBlock}>
          <View style={styles.verificationHeadingContainer}>
            <Text h4 style={styles.verificationHeading}>
              Epostanıza gönderdiğimiz doğrulama kodunu giriniz.
            </Text>
          </View>
          <Input
            value={enteredVerificationCode}
            placeholder="Doğrulama Kodu"
            onChangeText={(text) => setEnteredVerificationCode(text)}
            autoCapitalize="none"
            errorMessage={
              verificationCodeMatched === false
                ? "Girdiğiniz doğrulama kodu yanlış."
                : ""
            }
          />
          <Button
            onPress={() => verifyCode()}
            buttonStyle={{
              marginHorizontal: Spacing.SCALE_8,
              borderColor: Colors.PRIMARY,
            }}
            containerStyle={{
              paddingBottom: 2,
            }}
            title={"Onayla"}
          />
        </View>
      </View>
    </View>
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
  verificationHeadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  verificationHeading: {
    color: Colors.SECONDARY,
  },
});
