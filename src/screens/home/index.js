import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  SearchBar,
  Divider,
  Text,
  ListItem,
  Button,
  ButtonGroup,
  Avatar,
} from "react-native-elements";
import Constants from "expo-constants";
import { Colors, Spacing, Typography, Mixins } from "../../styles/index";
import { AuthContext } from "../../contexts/AuthProvider";
import { searchAdvert } from "../../api/adverts";
import { searchEmployees } from "../../api/employees";
import { searchEmployers } from "../../api/employers";
import { timeDifference, getDate } from "../../helpers/time-manipulations";

const buttons = ["İlan", "İşveren", "Çalışan"];

const HomeScreen = ({ navigation }) => {
  const { userToken, userRole, userProvince, userDistrict } = useContext(
    AuthContext
  );
  const [advertsNearMe, setAdvertsNearMe] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedAdvertsLoading, setSearchedAdvertsLoading] = useState(false);
  const [searchedEmployersLoading, setSearchedEmployersLoading] = useState(
    false
  );
  const [searchedEmployers, setSearchedEmployers] = useState(null);
  const [searchedEmployeesLoading, setSearchedEmployeesLoading] = useState(
    false
  );
  const [searchedEmployees, setSearchedEmployees] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchedAdverts, setSearchedAdverts] = useState(null);
  const [selectedSearchType, setSelectedSearchType] = useState(0);

  useEffect(() => {
    if ((userToken, userProvince, userDistrict)) {
      getAdvertsNearMe();
    }
  }, [userToken, userProvince, userDistrict]);

  const onRefresh = () => {
    getAdvertsNearMe();
  };

  const getAdvertsNearMe = () => {
    searchAdvert(
      { province: userProvince, district: userDistrict },
      userToken,
      (data) => {
        // console.log(data.data);
        setAdvertsNearMe(data.data);
        setIsLoading(false);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  const searchAdvertFromSearchBar = () => {
    setSearchedAdvertsLoading(true);
    searchAdvert(
      { searchCriteria: searchValue },
      userToken,
      (data) => {
        // console.log(data.data);
        setSearchedAdverts(data.data);
      },
      (err) => console.log(err)
    );
    setSearchedAdvertsLoading(false);
  };

  const searchEmployeeFromSearchBar = () => {
    setSearchedEmployeesLoading(true);
    searchEmployees(
      { searchCriteria: searchValue, offset: 0, limit: 5 },
      (data) => {
        console.log(data.data);
        setSearchedEmployees(data.data);
      },
      (err) => {
        console.log(err);
      }
    );
    setSearchedEmployeesLoading(false);
  };

  const searchEmployerFromSearchBar = () => {
    setSearchedEmployersLoading(true);
    searchEmployers(
      { searchCriteria: searchValue, offset: 0, limit: 5 },
      (data) => {
        // console.log(data.data);
        setSearchedEmployers(data.data);
      },
      (err) => {
        console.log(err);
      }
    );
    setSearchedEmployersLoading(false);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      if (selectedSearchType === 0) {
        searchAdvertFromSearchBar();
      } else if (selectedSearchType === 1) {
        searchEmployerFromSearchBar();
      } else if (selectedSearchType === 2) {
        searchEmployeeFromSearchBar();
      }
    }
  }, [searchValue, selectedSearchType]);

  return (
    <View style={styles.container}>
      <SearchBar
        round
        lightTheme
        placeholder="İlan, işveren veya çalışan ara..."
        onChangeText={(text) => setSearchValue(text)}
        value={searchValue}
        containerStyle={{
          backgroundColor: Colors.BACKGROUND,
        }}
        inputContainerStyle={{
          backgroundColor: Colors.WHITE,
        }}
      />
      {searchValue.length === 0 ? (
        <View style={styles.searchBarBottom}>
          <Text h4 style={styles.heading}>
            Yakınımdaki İlanlar
          </Text>
          <Divider />
          {advertsNearMe && advertsNearMe.length === 0 && (
            <View>
              <Text style={{ fontSize: 18, marginTop: 8 }}>
                Yakınımda ilan bulunamadı.
              </Text>
            </View>
          )}
          {isLoading === false && advertsNearMe === null && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 24,
              }}
            >
              <Text style={{ fontSize: 18, color: Colors.SECONDARY }}>
                İlan bulunmamaktadır.
              </Text>
            </View>
          )}
          {isLoading && (
            <View style={{ paddingTop: Spacing.SCALE_24 }}>
              <ActivityIndicator />
            </View>
          )}
          {refreshing ? (
            <View style={{ paddingTop: Spacing.SCALE_24 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={{ flex: 1, paddingTop: Spacing.SCALE_8 }}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={advertsNearMe}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ListItem
                    containerStyle={{ borderRadius: Spacing.SCALE_32 }}
                    key={item.advertId}
                    onPress={() =>
                      navigation.navigate("AdvertPreviewForHome", { ...item })
                    }
                    bottomDivider
                  >
                    <Avatar
                      size="medium"
                      title={`${item.employer.name[0]}${item.employer.surname[0]}`}
                      overlayContainerStyle={{
                        backgroundColor: Colors.SECONDARY,
                      }}
                      rounded
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                    <ListItem.Content style={{ paddingHorizontal: 12 }}>
                      <ListItem.Title
                        style={{ color: Colors.SECONDARY, fontWeight: "bold" }}
                      >
                        {item.advert.title} -{" "}
                        {timeDifference(item.advert.createdAt)}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: Colors.SECONDARY }}>
                        {item.advert.description}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )}
              />
            </View>
          )}
        </View>
      ) : selectedSearchType === 0 ? (
        <>
          <ButtonGroup
            onPress={(index) => setSelectedSearchType(index)}
            selectedIndex={selectedSearchType}
            buttons={buttons}
            containerStyle={{ height: 25, borderRadius: Spacing.SCALE_8 }}
          />
          <View style={styles.searchBarBottom}>
            {searchedAdvertsLoading && (
              <View style={{ paddingTop: Spacing.SCALE_24 }}>
                <ActivityIndicator />
              </View>
            )}
            {searchedAdverts &&
              searchedAdverts.length === 0 &&
              !searchedAdvertsLoading && (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontWeight: "bold", color: Colors.SECONDARY }}>
                    Sonuç bulunamadı.
                  </Text>
                </View>
              )}
            <View style={{ flex: 1 }}>
              {searchedAdverts && searchedAdverts.length !== 0 && (
                <>
                  <Text
                    h4
                    style={{
                      paddingBottom: 8,
                      paddingLeft: 8,
                      fontWeight: "600",
                      color: Colors.SECONDARY,
                    }}
                  >
                    İlan Sonuçları
                  </Text>
                  <Divider style={{ marginBottom: 12 }} />
                </>
              )}
              <FlatList
                data={searchedAdverts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ListItem
                    containerStyle={{
                      borderRadius: Spacing.SCALE_32,
                      marginBottom: Spacing.SCALE_8,
                    }}
                    key={item.advertId}
                    onPress={() =>
                      navigation.navigate("AdvertPreviewForHome", { ...item })
                    }
                    bottomDivider
                  >
                    <Avatar
                      size="medium"
                      title={`${item.employer.name[0]}${item.employer.surname[0]}`}
                      overlayContainerStyle={{
                        backgroundColor: Colors.SECONDARY,
                      }}
                      rounded
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                    <ListItem.Content style={{ paddingHorizontal: 12 }}>
                      <ListItem.Title
                        style={{ color: Colors.SECONDARY, fontWeight: "bold" }}
                      >
                        {item.advert.title} -{" "}
                        {timeDifference(item.advert.createdAt)}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: Colors.SECONDARY }}>
                        {item.advert.description}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )}
              />
            </View>
          </View>
        </>
      ) : selectedSearchType === 1 ? (
        <>
          <ButtonGroup
            onPress={(index) => setSelectedSearchType(index)}
            selectedIndex={selectedSearchType}
            buttons={buttons}
            containerStyle={{ height: 25, borderRadius: Spacing.SCALE_8 }}
          />
          <View style={styles.searchBarBottom}>
            {searchedEmployersLoading && (
              <View style={{ paddingTop: Spacing.SCALE_24 }}>
                <ActivityIndicator />
              </View>
            )}
            {searchedEmployers &&
              searchedEmployers.length === 0 &&
              !searchedEmployersLoading && (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontWeight: "bold", color: Colors.SECONDARY }}>
                    Sonuç bulunamadı.
                  </Text>
                </View>
              )}
            <View style={{ flex: 1 }}>
              {searchedEmployers && searchedEmployers.length !== 0 && (
                <>
                  <Text
                    h4
                    style={{
                      paddingBottom: 8,
                      paddingLeft: 8,
                      fontWeight: "600",
                      color: Colors.SECONDARY,
                    }}
                  >
                    İşveren Sonuçları
                  </Text>

                  <Divider style={{ marginBottom: 12 }} />
                </>
              )}
              <FlatList
                data={searchedEmployers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ListItem
                    containerStyle={{
                      borderRadius: Spacing.SCALE_32,
                      marginBottom: Spacing.SCALE_8,
                    }}
                    key={item.advertId}
                    onPress={() =>
                      navigation.navigate("SearchedProfilePreview", {
                        ...item,
                        userRole: "employer",
                      })
                    }
                    bottomDivider
                  >
                    <Avatar
                      size="medium"
                      title={`${item.name[0]}${item.surname[0]}`}
                      overlayContainerStyle={{
                        backgroundColor: Colors.SECONDARY,
                      }}
                      rounded
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                    <ListItem.Content style={{ paddingHorizontal: 12 }}>
                      <ListItem.Title
                        style={{ color: Colors.SECONDARY, fontWeight: "bold" }}
                      >
                        {`${item.name} ${item.surname}`}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )}
              />
            </View>
          </View>
        </>
      ) : selectedSearchType === 2 ? (
        <>
          <ButtonGroup
            onPress={(index) => setSelectedSearchType(index)}
            selectedIndex={selectedSearchType}
            buttons={buttons}
            containerStyle={{ height: 25, borderRadius: Spacing.SCALE_8 }}
          />
          <View style={styles.searchBarBottom}>
            {searchedEmployeesLoading && (
              <View style={{ paddingTop: Spacing.SCALE_24 }}>
                <ActivityIndicator />
              </View>
            )}
            {searchedEmployees &&
              searchedEmployees.length === 0 &&
              !searchedEmployeesLoading && (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontWeight: "bold", color: Colors.SECONDARY }}>
                    Sonuç bulunamadı.
                  </Text>
                </View>
              )}
            <View style={{ flex: 1 }}>
              {searchedEmployees && searchedEmployees.length !== 0 && (
                <>
                  <Text
                    h4
                    style={{
                      paddingBottom: 8,
                      paddingLeft: 8,
                      fontWeight: "600",
                      color: Colors.SECONDARY,
                    }}
                  >
                    Çalışan Sonuçları
                  </Text>

                  <Divider style={{ marginBottom: 12 }} />
                </>
              )}
              <FlatList
                data={searchedEmployees}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ListItem
                    containerStyle={{
                      borderRadius: Spacing.SCALE_32,
                      marginBottom: Spacing.SCALE_8,
                    }}
                    key={item.advertId}
                    onPress={() =>
                      navigation.navigate("SearchedProfilePreview", {
                        ...item,
                        userRole: "employee",
                      })
                    }
                    bottomDivider
                  >
                    <Avatar
                      size="medium"
                      title={`${item.name[0]}${item.surname[0]}`}
                      overlayContainerStyle={{
                        backgroundColor: Colors.SECONDARY,
                      }}
                      rounded
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                    <ListItem.Content style={{ paddingHorizontal: 12 }}>
                      <ListItem.Title
                        style={{ color: Colors.SECONDARY, fontWeight: "bold" }}
                      >
                        {`${item.name} ${item.surname}`}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )}
              />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.BACKGROUND,
  },
  searchBarBottom: {
    flex: 1,
    paddingHorizontal: Spacing.SCALE_12,
    marginTop: Spacing.SCALE_8,
  },
  heading: {
    color: Colors.SECONDARY,
    fontWeight: "bold",
    marginBottom: Spacing.SCALE_8,
  },
});
