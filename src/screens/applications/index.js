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

  const getEmployeesApplications = () => {
    getMyApplication(
      userToken,
      (data) => {
        // console.log(data.data);
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
      {refreshing ? <ActivityIndicator /> : null}
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
              onPress={() => navigation.navigate("AdvertPreview", { ...item })}
              bottomDivider
              containerStyle={{ borderRadius: Spacing.SCALE_32 }}
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
