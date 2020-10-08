import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { AuthContext } from "../../contexts/AuthProvider";
import { Button, Divider, Text } from "react-native-elements";
import ProvincesOverlay from "../../components/AddAdvert/ProvincesOverlay";
import DistrictsOverlay from "../../components/AddAdvert/DistrictsOverlay";
import NeighborhoodsOverlay from "../../components/AddAdvert/NeighborhoodsOverlay";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { searchAdvert } from "../../api/adverts";
import SearchedAdverts from "../../components/SearchAdvert/SearchedAdverts";

function SearchScreen({ navigation }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [neighborhood, setNeighborhood] = useState({});
  const [provinceOverlayVisible, setProvinceOverlayVisible] = useState(false);
  const [districtOverlayVisible, setDistrictOverlayVisible] = useState(false);
  const [neighborhoodOverlayVisible, setNeighborhoodOverlayVisible] = useState(
    false
  );
  const [foundAdverts, setFoundAdverts] = useState([]);

  const { logoutUser, userToken } = useContext(AuthContext);

  const handleSearchAdvert = () => {
    searchAdvert(
      {
        province: province.name,
        district: district.name,
        neighborhood: neighborhood.name,
      },
      userToken,
      (data) => {
        setFoundAdverts(data.data);
        console.log(data.data);
      },
      (err) => console.log(err.response.data)
    );
  };

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

  const getNeighborhoods = () => {
    axios
      .get(
        `https://il-ilce-rest-api.herokuapp.com/v1/towns/${district._id}/neighborhoods`
      )
      .then((data) => {
        // console.log(data.data);
        setNeighborhoods(data.data.data);
      })
      .catch((err) => console.log("Neighborhood Error"));
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

  return (
    <View style={styles.container}>
      {foundAdverts.length === 0 ? (
        <>
          <View>
            <Text h3 style={{ marginLeft: 8, marginBottom: 3 }}>
              İlan Ara
            </Text>
            <Divider />
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
            onPress={() => handleSearchAdvert()}
            icon={
              <Icon
                name="search"
                size={15}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            buttonStyle={{
              marginHorizontal: Spacing.SCALE_8,
              borderColor: Colors.PRIMARY,
              backgroundColor: Colors.INFO,
            }}
            containerStyle={{
              marginTop: 24,
            }}
            title="Ara"
          />
        </>
      ) : (
        <SearchedAdverts
          foundAdverts={foundAdverts}
          setFoundAdverts={setFoundAdverts}
          navigation={navigation}
          setProvince={setProvince}
          setDistrict={setDistrict}
          setNeighborhood={setNeighborhood}
        />
      )}
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 24,
    backgroundColor: Colors.BACKGROUND,
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
