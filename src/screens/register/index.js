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
  CheckBox,
} from "react-native-elements";
import { Colors, Spacing, Typography, Mixins } from "../../styles/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { registerEmployee } from "../../api/employees";
import { registerEmployer } from "../../api/employers";
import { sendVerificationEmail } from "../../api/emails";
import ProvincesOverlay from "../../components/AddAdvert/ProvincesOverlay";
import DistrictsOverlay from "../../components/AddAdvert/DistrictsOverlay";
import axios from "axios";

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
  const [campaignAllowance, setCampaignAllowance] = useState(false);
  const [kvkkAgreement, setKvkkAgreement] = useState(false);
  const [userAgreement, setUserAgreement] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [province, setProvince] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState({});
  const [districts, setDistricts] = useState([]);
  const [provinceOverlayVisible, setProvinceOverlayVisible] = useState(false);
  const [districtOverlayVisible, setDistrictOverlayVisible] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const updateSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  const register = async () => {
    if (kvkkAgreement === false && userAgreement === false) {
      setCheckboxError(true);
      alert(
        "Kayıt olmak için KVKK onayı ve Kullanıcı Sözleşmesi onayı gerekmektedir."
      );
    } else {
      setCheckboxError(false);
      if (password === passwordRepeat) {
        setPasswordsMatched(true);
        if (selectedIndex === 0) {
          registerEmployer(
            {
              name,
              surname,
              email,
              phone,
              address,
              password,
              province: province.name,
              district: district.name,
              userAgreement,
              kvkkAgreement,
              campaignAllowance,
            },
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
    getProvinces();
  }, []);

  useEffect(() => {
    if (province.name !== null) {
      getDistricts();
    }
  }, [province]);

  const getProvinces = () => {
    axios
      .get("https://il-ilce-rest-api.herokuapp.com/v1/cities")
      .then((data) => {
        // console.log(data.data);
        setProvinces(data.data.data);
      })
      .catch((err) => console.log("Province Error"));
  };

  const getDistricts = () => {
    axios
      .get(
        `https://il-ilce-rest-api.herokuapp.com/v1/cities/${province._id}/towns`
      )
      .then((data) => {
        // console.log(data.data);
        setDistricts(data.data.data);
      })
      .catch((err) => console.log("District Error"));
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
                <View style={styles.overlayInputHolder}>
                  <Text style={{ fontSize: 18, marginTop: 8 }}>
                    {!province.name ? "İl Seçiniz" : province.name}
                  </Text>
                  <Button
                    title="Seç"
                    onPress={() => setProvinceOverlayVisible(true)}
                  />
                </View>
                <Divider />
                <View style={styles.overlayInputHolder}>
                  <Text style={{ fontSize: 18, marginTop: 8 }}>
                    {!district.name ? "İlçe Seçiniz" : district.name}
                  </Text>
                  <Button
                    disabled={!province.name && true}
                    title="Seç"
                    onPress={() => setDistrictOverlayVisible(true)}
                  />
                </View>
                <ProvincesOverlay
                  provinceOverlayVisible={provinceOverlayVisible}
                  provinces={provinces}
                  setProvinceOverlayVisible={setProvinceOverlayVisible}
                  setProvince={setProvince}
                  setDistrict={setDistrict}
                />
                <DistrictsOverlay
                  districtOverlayVisible={districtOverlayVisible}
                  districts={districts}
                  setDistrictOverlayVisible={setDistrictOverlayVisible}
                  setDistrict={setDistrict}
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
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={kvkkAgreement}
                    onIconPress={() => setKvkkAgreement(!kvkkAgreement)}
                    title="KVKK doğrultusunda bilgilerimin saklanmasına onay veriyorum."
                  />
                  <CheckBox
                    checked={userAgreement}
                    onIconPress={() => setUserAgreement(!userAgreement)}
                    title="Kullanıcı sözleşmesini kabul ediyorum."
                  />
                  <CheckBox
                    checked={campaignAllowance}
                    onIconPress={() => setCampaignAllowance(!campaignAllowance)}
                    title="Kampanyalardan haberdar olmak istiyorum."
                  />
                </View>
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
                marginBottom: 32,
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
  overlayInputHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginVertical: 5,
  },
  checkboxContainer: {
    marginBottom: 12,
  },
});
