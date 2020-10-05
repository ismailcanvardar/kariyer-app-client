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
import { getMyAdverts } from "../../api/adverts";
import { Text, ListItem, Button } from "react-native-elements";
import { timeDifference, getDate } from "../../helpers/time-manipulations";

function AdvertsScreen({ navigation }) {
  const { userToken } = useContext(AuthContext);
  const [myAdverts, setMyAdverts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getEmployersAdverts = () => {
    getMyAdverts(
      userToken,
      (data) => {
        console.log(data.data);
        setRefreshing(false);
        setMyAdverts(data.data);
      },
      (e) => console.log(e.response.data.title)
    );
  };

  useEffect(() => {
    getEmployersAdverts();
  }, []);

  const onRefresh = () => {
    setMyAdverts([]);
    getEmployersAdverts();
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
          İlanlarım
        </Text>
        <Button
          buttonStyle={{ backgroundColor: Colors.SUCCESS }}
          titleStyle={{ color: Colors.WHITE }}
          title="İlan Ekle"
          onPress={() => navigation.navigate("AddAdvert")}
        ></Button>
      </View>
      {myAdverts !== null && myAdverts.length > 0 ? (
        refreshing ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={myAdverts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListItem
                key={item.advertId}
                onPress={() =>
                  navigation.navigate("AdvertPreview", { ...item })
                }
                bottomDivider
              >
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
        )
      ) : (
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
    </View>
  );
}

export default AdvertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});
