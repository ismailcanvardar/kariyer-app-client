import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing, Mixins, Typography } from "../../styles/index";
import { Text, Button, Divider } from "react-native-elements";
import { AuthContext } from "../../contexts/AuthProvider";
import { applyToAdvert, isApplied } from "../../api/applications";

function AdvertPreviewScreen({ route, navigation }) {
  const [isAppliedTo, setIsAppliedTo] = useState(null);

  useEffect(() => {
    checkIsApplied();
  }, []);

  const checkIsApplied = () => {
    isApplied(
      route.params.advertId,
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
          {route.params.title}
        </Text>
        <Text
          style={{ color: Colors.PRIMARY, fontWeight: "bold", paddingTop: 5 }}
        >
          {route.params.dailySalary} ₺ / gün -{" "}
          {route.params.totalApplicantCount} Toplam Katılım
        </Text>
      </View>
      <View style={styles.bottomer}>
        <Text style={styles.infoTextStyle}>
          Açıklama: {route.params.description}
        </Text>
        <Text style={styles.infoTextStyle}>İl: {route.params.province}</Text>
        <Text style={styles.infoTextStyle}>İlçe: {route.params.district}</Text>
        <Text style={styles.infoTextStyle}>
          Mahalle: {route.params.neighborhood}
        </Text>
        <Text style={styles.infoTextStyle}>
          Alınacak eleman sayısı: {route.params.neededEmployee}
        </Text>
        <Divider style={{ marginVertical: 12 }} />
        {userRole === "employee" && (
          <Button
            onPress={() =>
              applyToAdvert(
                route.params.advertId,
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
    flex: 1,
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
