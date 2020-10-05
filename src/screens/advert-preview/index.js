import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { Text, Button, Divider } from "react-native-elements";
import { AuthContext } from "../../contexts/AuthProvider";
import { applyToAdvert, isApplied } from "../../api/applications";

function AdvertPreviewScreen({ route, navigation }) {
  const [isAppliedTo, setIsAppliedTo] = useState(null);
  const [advert, setAdvert] = useState({});
  const [employer, setEmployer] = useState({});

  useEffect(() => {
    if (userRole === "employee") {
      checkIsApplied();
    }
  }, []);

  useEffect(() => {
    setAdvert(route.params.advert);
    setEmployer(route.params.employer);
  }, [route]);

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

  const { userRole, userToken } = useContext(AuthContext);

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
        <Divider style={{ marginVertical: 12 }} />
        {userRole === "employee" && (
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
