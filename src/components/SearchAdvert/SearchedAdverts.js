import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { ListItem, Text, Divider, Button } from "react-native-elements";
import Constants from "expo-constants";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { timeDifference } from "../../helpers/time-manipulations";

const SearchedAdverts = ({
  foundAdverts,
  setFoundAdverts,
  navigation,
  setProvince,
  setDistrict,
  setNeighborhood,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 12 }}>
        <Text h1 style={{ color: Colors.SECONDARY, fontWeight: "bold" }}>
          Sonuçlar
        </Text>
      </View>
      <Divider />
      <FlatList
        style={{ paddingTop: 12 }}
        data={foundAdverts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            key={item.advertId}
            onPress={() => navigation.navigate("SearchedAdvert")}
            bottomDivider
            containerStyle={{ borderRadius: 50 }}
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Button
          onPress={() => {
            setProvince({});
            setDistrict({});
            setNeighborhood({});
            setFoundAdverts([]);
          }}
          buttonStyle={{
            marginHorizontal: Spacing.SCALE_8,
            borderColor: Colors.PRIMARY,
          }}
          containerStyle={{
            paddingBottom: 2,
          }}
          titleStyle={{
            color: Colors.PRIMARY,
            fontWeight: "bold",
            fontSize: 18,
          }}
          type="clear"
          title="Aramaya geri dön."
        />
      </View>
    </View>
  );
};

export default SearchedAdverts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
