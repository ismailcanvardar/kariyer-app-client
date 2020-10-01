import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Overlay, ListItem } from "react-native-elements";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import Constants from "expo-constants";

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

function ProvincesOverlay({
  provinceOverlayVisible,
  provinces,
  setProvinceOverlayVisible,
  setProvince,
  setDistrict,
  setNeighborhood,
}) {
  return (
    <Overlay
      isVisible={provinceOverlayVisible}
      onBackdropPress={() => setProvinceOverlayVisible(false)}
      fullScreen={true}
    >
      <View style={styles.container}>
        <FlatList
          removeClippedSubviews={true}
          viewabilityConfig={VIEWABILITY_CONFIG}
          data={provinces}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              bottomDivider
              onPress={() => {
                setProvince({
                  name: item.name,
                  _id: item._id,
                });
                setDistrict({});
                setNeighborhood({});
                setProvinceOverlayVisible(false);
              }}
            >
              <ListItem.Content style={{ paddingHorizontal: 12 }}>
                <ListItem.Title style={{ color: Colors.SECONDARY }}>
                  {item.name}
                </ListItem.Title>
                {/* <ListItem.Subtitle style={{ color: Colors.SECONDARY }}>
        {item.description}
      </ListItem.Subtitle> */}
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </Overlay>
  );
}

export default ProvincesOverlay;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
