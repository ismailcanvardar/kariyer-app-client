import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { AuthContext } from "../../contexts/AuthProvider";
import { getMyApplication } from "../../api/applications";
import { Text, ListItem, Button } from "react-native-elements";
import { timeDifference, getDate } from "../../helpers/time-manipulations";

function ApplicationsScreen({ navigation }) {
  const { userToken } = useContext(AuthContext);
  const [myApplications, setMyApplications] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      getEmployeesApplications();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getEmployeesApplications = () => {
    getMyApplication(
      userToken,
      (data) => {
        console.log(data.data);
        setRefreshing(false);
        setMyApplications(data.data);
      },
      (e) => console.log(e.response.data.title)
    );
  };

  useEffect(() => {
    getEmployeesApplications();
  }, []);

  const onRefresh = () => {
    setMyApplications([]);
    getEmployeesApplications();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 8,
          backgroundColor: Colors.PRIMARY,
          paddingTop: Constants.statusBarHeight,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text h3 style={{ color: Colors.WHITE }}>
          Başvurularım
        </Text>
      </View>
      {refreshing && <ActivityIndicator />}
      {myApplications !== null && myApplications.length === 0 && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: Colors.SECONDARY,
              fontWeight: "bold",
              marginTop: 24,
            }}
          >
            Başvurunuz bulunmamaktadır.
          </Text>
        </View>
      )}
      <View
        style={{
          paddingTop: Spacing.SCALE_8,
          paddingHorizontal: Spacing.SCALE_12,
          flex: 1,
        }}
      >
        <FlatList
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={myApplications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              key={item.advertId}
              onPress={() =>
                navigation.navigate("AdvertPreview", {
                  advert: { ...item.advert },
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
                  {item.advert.title} - {timeDifference(item.advert.createdAt)}
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
  );
}

export default ApplicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});
