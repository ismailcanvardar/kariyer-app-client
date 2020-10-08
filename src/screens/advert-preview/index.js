import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { Text, Button, Divider, ListItem, Avatar } from "react-native-elements";
import { AuthContext } from "../../contexts/AuthProvider";
import {
  applyToAdvert,
  isApplied,
  getApplicationsByAdvert,
  cancelApplication,
} from "../../api/applications";
import { pickEmployee } from "../../api/pickedEmployees";
import { Rating } from "react-native-rating-element";

function AdvertPreviewScreen({ route, navigation }) {
  const [isAppliedTo, setIsAppliedTo] = useState(null);
  const [advert, setAdvert] = useState({});
  const [employer, setEmployer] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [applications, setApplications] = useState(null);
  const [isApplicationsLoading, setIsApplicationsLoading] = useState(true);

  const Button1 = () => <Text style={{ color: "green" }}>Seç</Text>;
  const Button2 = () => <Text style={{ color: "red" }}>Sil</Text>;

  const buttons = [{ element: Button1 }, { element: Button2 }];

  const handleButtonGroupPress = (
    buttonType,
    index,
    applicationId,
    employeeId,
    advertId
  ) => {
    if (buttonType === 0) {
      pickEmployee(
        { employeeId, advertId },
        userToken,
        (data) => {
          console.log(data.data);
          alert("Başvuru başarıyla seçildi.");
          let apps = applications;
          apps.splice(index, 1);
          setApplications([...apps]);
        },
        (err) => {
          console.log(err.response.data);
        }
      );
    } else if (buttonType === 1) {
      console.log("Sil");
      console.log(applicationId);
      cancelApplication(
        applicationId,
        userToken,
        (data) => {
          alert("Başvuru başarıyla silindi.");
          let apps = applications;
          apps.splice(index, 1);
          setApplications([...apps]);
        },
        (err) => {
          console.log("hata");
          console.log(err.response.data);
        }
      );
    }
  };

  useEffect(() => {
    if (userRole === "employee") {
      checkIsApplied();
    }
  }, []);

  useEffect(() => {
    setAdvert(route.params.advert);
    setEmployer(route.params.employer);
  }, [route]);

  useEffect(() => {
    console.log("---------------------------------------");
    console.log(advert);
    console.log(employerId);
  }, [advert]);

  const checkIsApplied = () => {
    isApplied(
      route.params.advert.advertId,
      userToken,
      (data) => {
        console.log(data.data);
        setIsAppliedTo(data.data);
      },
      (err) => console.log(err.response)
    );
  };

  const getApplications = () => {
    setIsApplicationsLoading(true);
    getApplicationsByAdvert(
      advert.advertId,
      userToken,
      (data) => {
        console.log(data.data);
        setApplications(data.data);
      },
      (err) => {
        console.log(err.response);
      }
    );
    setIsApplicationsLoading(false);
  };

  useEffect(() => {
    if (advert !== null) {
      getApplications();
    }
  }, [advert]);

  const { userRole, userToken, employerId } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.topper}>
        <Text
          h1
          style={{ color: Colors.PRIMARY, fontWeight: "bold", paddingTop: 5 }}
        >
          {advert.title}
        </Text>
        <Text
          style={{ color: Colors.PRIMARY, fontWeight: "bold", paddingTop: 5 }}
        >
          {advert.dailySalary} ₺ / gün - Toplam Katılım:{" "}
          {advert.totalApplicantCount}
        </Text>
      </View>
      <View style={styles.bottomer}>
        <Text style={styles.infoTextStyle}>Açıklama: {advert.description}</Text>
        <Text style={styles.infoTextStyle}>İl: {advert.province}</Text>
        <Text style={styles.infoTextStyle}>İlçe: {advert.district}</Text>
        <Text style={styles.infoTextStyle}>Mahalle: {advert.neighborhood}</Text>
        <Text style={styles.infoTextStyle}>
          Alınacak eleman sayısı: {advert.neededEmployee}
        </Text>

        {userRole === "employee" && (
          <>
            <Divider style={{ marginVertical: 12 }} />
            <Button
              onPress={() =>
                applyToAdvert(
                  advert.advertId,
                  userToken,
                  (data) => {
                    console.log(data.data);
                    checkIsApplied();
                    alert("Başvuru yapıldı.");
                  },
                  (err) => console.log(err.response.data)
                )
              }
              title="Başvuru Yap"
              buttonStyle={{ backgroundColor: Colors.SUCCESS }}
              disabled={isAppliedTo === true ? true : false}
            />
          </>
        )}
        {advert && advert.employerId === employerId && (
          <>
            <Divider />
            <View style={{ marginTop: Spacing.SCALE_8 }}>
              <Text
                style={{
                  color: Colors.SECONDARY,
                  fontSize: Spacing.SCALE_32,
                  fontWeight: "bold",
                }}
              >
                Başvurular
              </Text>
            </View>
            {isApplicationsLoading ? (
              <View style={{ flex: 1 }}>
                <ActivityIndicator />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  paddingTop: Spacing.SCALE_8,
                }}
              >
                {applications && applications.length === 0 && (
                  <Text style={{ fontSize: Spacing.SCALE_18 }}>
                    Başvuru bulunmamaktadır.
                  </Text>
                )}
                <FlatList
                  data={applications}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <ListItem
                      key={item.advertId}
                      onPress={() =>
                        navigation.navigate("SearchedProfilePreview", {
                          ...item.employee,
                          userRole: "employee",
                        })
                      }
                      // bottomDivider
                      containerStyle={{
                        borderRadius: Spacing.SCALE_32,
                        marginBottom: 8,
                      }}
                    >
                      <Avatar
                        size="medium"
                        title={`${item.employee.name[0]}${item.employee.surname[0]}`}
                        overlayContainerStyle={{
                          backgroundColor: Colors.SECONDARY,
                        }}
                        rounded
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                      />
                      <ListItem.Content style={{ paddingHorizontal: 12 }}>
                        <ListItem.Title
                          style={{
                            color: Colors.SECONDARY,
                            fontWeight: "bold",
                            fontSize: Spacing.SCALE_16,
                          }}
                        >
                          {item.employee.name} {item.employee.surname}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: Colors.SECONDARY }}>
                          <View
                            style={{
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Rating
                              rated={item.employee.totalRating}
                              totalCount={5}
                              ratingColor="#f1c644"
                              ratingBackgroundColor="#d4d4d4"
                              size={18}
                              readonly
                              icon="ios-star"
                              direction="row"
                            />
                          </View>
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.ButtonGroup
                        onPress={(buttonType) =>
                          handleButtonGroupPress(
                            buttonType,
                            index,
                            item.application.applicationId,
                            item.employee.employeeId,
                            item.application.advertId
                          )
                        }
                        buttons={buttons}
                      />
                    </ListItem>
                  )}
                />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

export default AdvertPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  topper: {
    flex: 2,
    backgroundColor: Colors.INFO,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomer: {
    flex: 5,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  infoTextStyle: {
    fontSize: 18,
    color: Colors.SECONDARY,
    paddingVertical: 8,
    fontWeight: "bold",
  },
});
