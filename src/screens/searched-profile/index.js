import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { AuthContext } from "../../contexts/AuthProvider";
import { getMyEmployeeProfile } from "../../api/employees";
import { getMyEmployerProfile } from "../../api/employers";
import {
  getAdvertsOfDefinedEmployer,
  getAdvertsOfDefinedEmployee,
} from "../../api/adverts";
import { getApplicationsOfDefinedEmployer } from "../../api/applications";
import { Avatar, Text, Divider, ListItem, Badge } from "react-native-elements";
import { Rating } from "react-native-rating-element";
import { timeDifference } from "../../helpers/time-manipulations";

function SearchedProfile({ route, navigation }) {
  const [user, setUser] = useState(null);
  const { logoutUser, userToken, userRole } = useContext(AuthContext);
  const [foundAdverts, setFoundAdverts] = useState([]);
  const [foundApplications, setFoundApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(route.params);
    setUser(route.params);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (route.params.userRole === "employer") {
      getAdvertsOfDefinedEmployer(
        route.params.employerId,
        userToken,
        (data) => {
          console.log(data.data);
          setFoundAdverts(data.data);
        },
        (err) => {
          console.log(err.response.data);
        }
      );
    } else if (route.params.userRole === "employee") {
      getAdvertsOfDefinedEmployee(
        route.params.employeeId,
        userToken,
        (data) => {
          console.log(data.data);
          setFoundApplications(data.data);
        },
        (err) => {
          console.log(err.response.data);
        }
      );
    }
    setIsLoading(false);
  }, []);

  const onRefresh = () => {
    if (route.params.userRole === "employer") {
      getAdvertsOfDefinedEmployer(
        route.params.employerId,
        userToken,
        (data) => {
          console.log(data.data);
          setFoundAdverts(data.data);
        },
        (err) => {
          console.log(err.response.data);
        }
      );
    } else if (route.params.userRole === "employee") {
      getAdvertsOfDefinedEmployee(
        route.params.employeeId,
        userToken,
        (data) => {
          console.log(data.data);
          setFoundApplications(data.data);
        },
        (err) => {
          console.log(err.response.data);
        }
      );
    }
  };

  //   useEffect(() => {
  //     if (userRole === "employer") {
  //       getMyEmployerProfile(
  //         userToken,
  //         (data) => {
  //           setUser(data.data);
  //         },
  //         (e) => console.log(e.response.data.title)
  //       );
  //     } else if (userRole === "employee") {
  //       getMyEmployeeProfile(
  //         userToken,
  //         (data) => {
  //           setUser(data.data);
  //         },
  //         (e) => console.log(e.response.data.title)
  //       );
  //     }
  //   }, []);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {user !== null ? (
        <>
          <View style={styles.avatarHolder}>
            <View>
              {user.profilePhoto !== null ? (
                <Avatar
                  size={Mixins.WINDOW_WIDTH / 3}
                  rounded
                  // source={{
                  //   uri:
                  //     "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                  // }}
                  title="TK"
                  onPress={() => null}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: Colors.PRIMARY,
                  }}
                />
              ) : (
                <Avatar
                  size={Mixins.WINDOW_WIDTH / 3}
                  rounded
                  // source={{
                  //   uri:
                  //     "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                  // }}
                  title="TK"
                  onPress={() => null}
                  activeOpacity={0.7}
                  containerStyle={{
                    backgroundColor: Colors.PRIMARY,
                  }}
                />
              )}
              <Badge
                value={userRole === "employee" ? "Çalışan" : "İşveren"}
                status="success"
                containerStyle={{ position: "absolute", top: -4, right: -4 }}
              />
            </View>
          </View>
          <View style={styles.nameHolder}>
            <Text h4 style={{ color: Colors.SECONDARY }}>
              {user.name} {user.surname}
            </Text>
            {user.userRole === "employee" && (
              <Rating
                rated={user.totalRating}
                totalCount={5}
                ratingColor="#f1c644"
                ratingBackgroundColor="#d4d4d4"
                size={24}
                readonly
                icon="ios-star"
                direction="row"
              />
            )}
          </View>
          <Divider style={styles.dividerStyle} />
          {route.params.userRole === "employer" ? (
            <View style={{ paddingHorizontal: Spacing.SCALE_18, flex: 1 }}>
              {refreshing ? <ActivityIndicator /> : null}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.SECONDARY,
                    fontWeight: "600",
                    marginLeft: Spacing.SCALE_8,
                    fontSize: 24,
                    marginBottom: Spacing.SCALE_8,
                  }}
                >
                  Paylaşılan İlanlar
                </Text>
              </View>
              {!refreshing && !isLoading && foundAdverts.length === 0 && (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontWeight: "bold", color: Colors.SECONDARY }}>
                    Sonuç bulunamadı.
                  </Text>
                </View>
              )}
              <FlatList
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={foundAdverts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ListItem
                    key={item.advertId}
                    onPress={() =>
                      navigation.navigate("SearchedAdvertPreviewForHome", {
                        advert: { ...item },
                      })
                    }
                    bottomDivider
                    containerStyle={{
                      borderRadius: Spacing.SCALE_32,
                      marginBottom: 8,
                    }}
                  >
                    <ListItem.Content style={{ paddingHorizontal: 12 }}>
                      <ListItem.Title
                        style={{ color: Colors.SECONDARY, fontWeight: "bold" }}
                      >
                        {item.title} - {timeDifference(item.createdAt)}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: Colors.SECONDARY }}>
                        {item.description}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )}
              />
            </View>
          ) : (
            <View style={{ paddingHorizontal: Spacing.SCALE_18, flex: 1 }}>
              {refreshing ? <ActivityIndicator /> : null}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.SECONDARY,
                    fontWeight: "600",
                    marginLeft: Spacing.SCALE_8,
                    fontSize: 24,
                    marginBottom: Spacing.SCALE_8,
                  }}
                >
                  Başvurulan İlanlar
                </Text>
              </View>
              {!refreshing &&
                !isLoading &&
                foundApplications &&
                foundApplications.length === 0 && (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{ fontWeight: "bold", color: Colors.SECONDARY }}
                    >
                      Sonuç bulunamadı.
                    </Text>
                  </View>
                )}
              <FlatList
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={foundApplications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ListItem
                    containerStyle={{
                      borderRadius: Spacing.SCALE_32,
                      marginBottom: 8,
                    }}
                    key={item.advertId}
                    onPress={() =>
                      navigation.navigate("SearchedAdvertPreviewForHome", {
                        advert: { ...item },
                      })
                    }
                    bottomDivider
                  >
                    <ListItem.Content style={{ paddingHorizontal: 12 }}>
                      <ListItem.Title
                        style={{ color: Colors.SECONDARY, fontWeight: "bold" }}
                      >
                        {item.title} - {timeDifference(item.createdAt)}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ color: Colors.SECONDARY }}>
                        {item.description}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )}
              />
            </View>
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

export default SearchedProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: Colors.BACKGROUND,
  },
  avatarHolder: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
  nameHolder: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
  },
  dividerStyle: {
    margin: 12,
    height: 1,
  },
  listHolder: {
    marginTop: 24,
  },
});
