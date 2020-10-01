import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/search/index";
import ProfileScreen from "../screens/profile/index";
import ApplicationsScreen from "../screens/applications/index";
import AdvertsScreen from "../screens/adverts/index";
import AddAdvertScreen from "../screens/add-advert/index";
import AdvertPreviewScreen from "../screens/advert-preview/index";
import SearchedAdvert from "../screens/searched-advert/index";
import { AuthContext } from "../contexts/AuthProvider";
import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { Colors, Spacing, Mixins, Typography } from "../styles/index";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

const AdvertsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Adverts"
      options={{ headerShown: false }}
      component={AdvertsScreen}
    />
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
        headerTitle: "İlan Ekle",
      }}
      name="AddAdvert"
      component={AddAdvertScreen}
    />
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
        headerTitle: "İlan",
      }}
      name="AdvertPreview"
      component={AdvertPreviewScreen}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      options={{ headerShown: false }}
      component={SearchScreen}
    />
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
        headerTitle: "İlan",
      }}
      name="SearchedAdvert"
      component={SearchedAdvert}
    />
  </Stack.Navigator>
);

const ProfileStack = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.PRIMARY },
          headerTintColor: Colors.WHITE,
          headerTitle: "Profil",
          headerRight: () => {
            return (
              <Button
                onPress={() => logoutUser()}
                icon={
                  <Icon
                    name="sign-out"
                    size={15}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                }
                titleStyle={{
                  color: Colors.WHITE,
                }}
                buttonStyle={{
                  marginHorizontal: Spacing.SCALE_8,
                }}
                title="Çıkış"
                type="clear"
              />
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { userRole } = useContext(AuthContext);

  const tabBarIcon = (tabInfo, iconName) => {
    return (
      <Icon
        name={iconName}
        size={tabInfo.focused ? 20 : 15}
        color={tabInfo.focused ? Colors.WHITE : Colors.GRAY_MEDIUM}
      />
    );
  };

  return (
    <Navigator
      tabBarOptions={{
        tabStyle: { backgroundColor: Colors.PRIMARY },
        inactiveTintColor: Colors.GRAY_MEDIUM,
        activeTintColor: Colors.WHITE,
      }}
    >
      {userRole === "employer" ? (
        <Screen
          name="Adverts"
          options={{
            tabBarIcon: (tabInfo) => tabBarIcon(tabInfo, "file-text"),
            tabBarLabel: "İlanlarım",
          }}
          component={AdvertsStack}
        />
      ) : (
        <Screen
          name="Applications"
          options={{
            tabBarIcon: (tabInfo) => tabBarIcon(tabInfo, "file-text"),
            tabBarLabel: "Başvurularım",
          }}
          component={ApplicationsScreen}
        />
      )}
      <Screen
        name="Search"
        options={{
          tabBarIcon: (tabInfo) => tabBarIcon(tabInfo, "search"),
          tabBarLabel: "Ara",
        }}
        component={SearchStack}
      />
      <Screen
        name="Profile"
        options={{
          tabBarIcon: (tabInfo) => tabBarIcon(tabInfo, "user"),
          tabBarLabel: "Profil",
        }}
        component={ProfileStack}
      />
    </Navigator>
  );
};

const BottomNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default BottomNavigator;
