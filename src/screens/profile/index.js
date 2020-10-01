import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { AuthContext } from "../../contexts/AuthProvider";
import { getMyEmployeeProfile } from "../../api/employees";
import { getMyEmployerProfile } from "../../api/employers";
import { Avatar, Text, Divider, ListItem } from "react-native-elements";

function ProfileScreen() {
  const [user, setUser] = useState(null);
  const { logoutUser, userToken, userRole } = useContext(AuthContext);

  useEffect(() => {
    if (userRole === "employer") {
      getMyEmployerProfile(
        userToken,
        (data) => {
          setUser(data.data);
        },
        (e) => console.log(e.response.data.title)
      );
    } else if (userRole === "employee") {
      getMyEmployeeProfile(
        userToken,
        (data) => {
          setUser(data.data);
        },
        (e) => console.log(e.response.data.title)
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      {user !== null ? (
        <>
          <View style={styles.avatarHolder}>
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
          </View>
          <View style={styles.nameHolder}>
            <Text h4 style={{ color: Colors.SECONDARY }}>
              {user.name} {user.surname}
            </Text>
          </View>
          {/* <Divider style={styles.dividerStyle} /> */}
          <View style={styles.listHolder}>
            <ListItem
              key={"email"}
              topDivider
              bottomDivider
              containerStyle={{ backgroundColor: Colors.BACKGROUND }}
            >
              <ListItem.Content style={{ paddingHorizontal: 24 }}>
                <ListItem.Title>{"Eposta"}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem
              key={"phone"}
              bottomDivider
              containerStyle={{ backgroundColor: Colors.BACKGROUND }}
            >
              <ListItem.Content style={{ paddingHorizontal: 24 }}>
                <ListItem.Title>{"Telefon"}</ListItem.Title>
                <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem
              key={"address"}
              bottomDivider
              containerStyle={{ backgroundColor: Colors.BACKGROUND }}
            >
              <ListItem.Content style={{ paddingHorizontal: 24 }}>
                <ListItem.Title>{"Adres"}</ListItem.Title>
                <ListItem.Subtitle>{user.address}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

export default ProfileScreen;

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
