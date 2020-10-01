import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-community/picker";
import {
  Text,
  Input,
  Overlay,
  ListItem,
  Button,
  Divider,
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import ProvincesOverlay from "../../components/AddAdvert/ProvincesOverlay";
import DistrictsOverlay from "../../components/AddAdvert/DistrictsOverlay";
import NeighborhoodsOverlay from "../../components/AddAdvert/NeighborhoodsOverlay";
import Icon from "react-native-vector-icons/FontAwesome";
import { createAdvert } from "../../api/adverts";
import { AuthContext } from "../../contexts/AuthProvider";

const AddAdvertScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("java");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dailySalary, setDailySalary] = useState("");
  const [neededEmployee, setNeededEmployee] = useState("");
  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [neighborhood, setNeighborhood] = useState({});
  const [provinceOverlayVisible, setProvinceOverlayVisible] = useState(false);
  const [districtOverlayVisible, setDistrictOverlayVisible] = useState(false);
  const [neighborhoodOverlayVisible, setNeighborhoodOverlayVisible] = useState(
    false
  );
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const { userToken } = useContext(AuthContext);

  const handleCreateAdvert = () => {
    createAdvert(
      {
        title,
        description,
        dailySalary: parseFloat(dailySalary),
        neededEmployee: parseInt(neededEmployee),
        province: province.name,
        district: district.name,
        neighborhood: neighborhood.name,
      },
      userToken,
      (data) => {
        // console.log(data);
        navigation.goBack();
      },
      (e) => console.log(e.response.data.title)
    );
  };

  const getProvinces = () => {
    axios
      .get("https://il-ilce-rest-api.herokuapp.com/v1/cities")
      .then((data) => {
        // console.log(data.data);
        setProvinces(data.data.data);
      })
      .catch((err) => console.log(err.response));
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
      .catch((err) => console.log(err.response));
  };

  const getNeighborhoods = () => {
    axios
      .get(
        `https://il-ilce-rest-api.herokuapp.com/v1/towns/${district._id}/neighborhoods`
      )
      .then((data) => {
        // console.log(data.data);
        setNeighborhoods(data.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (province.name !== null) {
      getDistricts();
    }
  }, [province]);

  useEffect(() => {
    if (neighborhood.name !== null) {
      getNeighborhoods();
    }
  }, [district]);

  useEffect(() => {
    if (
      title !== "" &&
      description !== "" &&
      dailySalary !== "" &&
      neededEmployee !== "" &&
      province.name !== null &&
      district.name !== null &&
      neighborhood.name !== null
    ) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [
    title,
    description,
    dailySalary,
    neededEmployee,
    province,
    district,
    neighborhood,
  ]);

  return (
    <View style={styles.container}>
      <Input onChangeText={(text) => setTitle(text)} placeholder="Başlık" />
      <Input
        onChangeText={(text) => setDescription(text)}
        placeholder="Açıklama"
      />
      <Input
        onChangeText={(text) => setNeededEmployee(text)}
        keyboardType="numeric"
        placeholder="Gereken Eleman Sayısı"
      />
      <Input
        onChangeText={(text) => setDailySalary(text)}
        keyboardType="numeric"
        placeholder="Günlük Ücret"
      />
      <View>
        <View style={styles.overlayInputHolder}>
          <Text style={{ fontSize: 18, marginTop: 8 }}>
            {!province.name ? "İl Seçiniz" : province.name}
          </Text>
          <Button title="Seç" onPress={() => setProvinceOverlayVisible(true)} />
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
        <Divider />
        <View style={styles.overlayInputHolder}>
          <Text style={{ fontSize: 18, marginTop: 8 }}>
            {!neighborhood.name ? "Mahalle Seçiniz" : neighborhood.name}
          </Text>
          <Button
            disabled={!district.name && true}
            title="Seç"
            onPress={() => setNeighborhoodOverlayVisible(true)}
          />
        </View>
      </View>
      <ProvincesOverlay
        provinceOverlayVisible={provinceOverlayVisible}
        provinces={provinces}
        setProvinceOverlayVisible={setProvinceOverlayVisible}
        setProvince={setProvince}
        setDistrict={setDistrict}
        setNeighborhood={setNeighborhood}
      />
      <DistrictsOverlay
        districtOverlayVisible={districtOverlayVisible}
        districts={districts}
        setDistrictOverlayVisible={setDistrictOverlayVisible}
        setDistrict={setDistrict}
        setNeighborhood={setNeighborhood}
      />
      <NeighborhoodsOverlay
        neighborhoodOverlayVisible={neighborhoodOverlayVisible}
        neighborhoods={neighborhoods}
        setNeighborhoodOverlayVisible={setNeighborhoodOverlayVisible}
        setNeighborhood={setNeighborhood}
      />
      <Button
        onPress={() => handleCreateAdvert()}
        disabled={saveButtonDisabled}
        icon={
          <Icon
            name="save"
            size={15}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        buttonStyle={{
          marginHorizontal: Spacing.SCALE_8,
          borderColor: Colors.PRIMARY,
          backgroundColor: Colors.SUCCESS,
        }}
        containerStyle={{
          marginTop: 24,
        }}
        title="Kaydet"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  inputHolder: {
    flexDirection: "row",
  },
  overlayInputHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginVertical: 5,
  },
});

export default AddAdvertScreen;
