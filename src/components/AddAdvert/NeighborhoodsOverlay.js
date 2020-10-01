import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Overlay, ListItem } from "react-native-elements";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import Constants from "expo-constants";

function NeighborhoodsOverlay({
  neighborhoodOverlayVisible,
  neighborhoods,
  setNeighborhoodOverlayVisible,
  setNeighborhood,
}) {
  return (
    <Overlay
      isVisible={neighborhoodOverlayVisible}
      onBackdropPress={() => setNeighborhoodOverlayVisible(false)}
      fullScreen={true}
    >
      <View style={styles.container}>
        <FlatList
          data={neighborhoods}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              bottomDivider
              onPress={() => {
                setNeighborhood({
                  name: item.name,
                  _id: item._id,
                });
                setNeighborhoodOverlayVisible(false);
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

export default NeighborhoodsOverlay;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
