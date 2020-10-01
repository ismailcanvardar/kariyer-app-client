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

function DistrictsOverlay({
  districtOverlayVisible,
  districts,
  setDistrictOverlayVisible,
  setDistrict,
  setNeighborhood,
}) {
  return (
    <Overlay
      isVisible={districtOverlayVisible}
      onBackdropPress={() => setDistrictOverlayVisible(false)}
      fullScreen={true}
    >
      <View style={styles.container}>
        <FlatList
          removeClippedSubviews={true}
          viewabilityConfig={VIEWABILITY_CONFIG}
          data={districts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              bottomDivider
              onPress={() => {
                setDistrict({
                  name: item.name,
                  _id: item._id,
                });
                setNeighborhood({});
                setDistrictOverlayVisible(false);
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

export default DistrictsOverlay;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
