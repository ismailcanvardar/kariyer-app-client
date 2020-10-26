import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Colors, Mixins, Spacing, Typography } from "../../styles";
import { Input, Button, Divider, Text } from "react-native-elements";
import { updateAboutEmployee } from "../../api/aboutEmployees";
import { updateEmployee } from "../../api/employees";
import { AuthContext } from "../../contexts/AuthProvider";

const EditProfileScreen = ({ route, navigation }) => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");
  const [briefInformation, setBriefInformation] = useState("");

  const { employeeId } = useContext(AuthContext);

  const save = () => {
    if (phone.length > 0 && address.length > 0) {
      updateEmployee({
        employeeId: employeeId,
        phone,
        address,
      });
    } else if (phone.length > 0) {
      updateEmployee({
        employeeId: employeeId,
        phone,
      });
    } else if (address.length > 0) {
      updateEmployee({
        employeeId: employeeId,
        address,
      });
    }

    if (job.length > 0 && briefInformation.length > 0) {
      updateAboutEmployee({
        employeeId: employeeId,
        job,
        briefInformation,
      });
    } else if (job.length > 0) {
      updateEmployee({
        employeeId: employeeId,
        job,
      });
    } else if (briefInformation.length > 0) {
      updateEmployee({
        employeeId: employeeId,
        briefInformation,
      });
    }

    setTimeout(() => {
      navigation.navigate("Profile");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          paddingLeft: 8,
          fontWeight: "bold",
          color: Colors.SECONDARY,
          marginBottom: 8,
        }}
      >
        Telefon
      </Text>
      <Input
        placeholder={route.params.user.phone}
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <Text
        style={{
          paddingLeft: 8,
          fontWeight: "bold",
          color: Colors.SECONDARY,
          marginBottom: 8,
        }}
      >
        Adres
      </Text>
      <Input
        placeholder={route.params.user.address}
        onChangeText={(text) => setAddress(text)}
        value={address}
      />
      <Text
        style={{
          paddingLeft: 8,
          fontWeight: "bold",
          color: Colors.SECONDARY,
          marginBottom: 8,
        }}
      >
        Meslek
      </Text>
      <Input
        placeholder={
          route.params.aboutEmployee.job
            ? route.params.aboutEmployee.job
            : "Belirtilmedi"
        }
        onChangeText={(text) => setJob(text)}
        value={job}
      />
      <Text
        style={{
          paddingLeft: 8,
          fontWeight: "bold",
          color: Colors.SECONDARY,
          marginBottom: 8,
        }}
      >
        Geçmiş / Tecrübeler
      </Text>
      <Input
        multiline
        placeholder={route.params.aboutEmployee.briefInformation}
        onChangeText={(text) => setBriefInformation(text)}
        value={briefInformation}
      />
      <Divider />
      <Button title="Kaydet" onPress={() => save()} />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});
