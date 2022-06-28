import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import { t } from "i18next";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import myStyle from "../assets/styles";
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { Button } from "@rneui/base";

export class GoolgeMap extends Component {
  state = {
    LocationsWithChosed: [],
    focusedLocation: {
      latitude: 54.78584581587012,
      latitudeDelta: 1,
      longitude: 8.319035083075878,
      longitudeDelta: 1,
    },
  };
  constructor(props) {
    super(props);
    this.markers = [];
  }

  componentDidMount() {
    let { navigation, route } = this.props;
    navigation.addListener(
      "focus",
      () => {
        this.getLongPressedLocation();
      },
      [route]
    );
    this.getData();
  }

  getData = async () => {
    try {
      let asyncLocationsWithChosed = await AsyncStorage.getItem(
        "LocationsWithChosed"
      );
      if (asyncLocationsWithChosed !== null) {
        this.setState({
          LocationsWithChosed: JSON.parse(asyncLocationsWithChosed),
        });
      }
    } catch (err) {
      console.log("Error get Data :" + err);
    }
  };

  async getLongPressedLocation() {
    let { navigation, route } = this.props;

    route.params
      ? this.setState({
          focusedLocation: {
            latitude: route.params.focusedLocation.coords.latitude,
            latitudeDelta: 0.2,
            longitude: route.params.focusedLocation.coords.longitude,
            longitudeDelta: 0.2,
          },
        })
      : null;
  }

  saveData = async (i, d) => {
    this.markers[i].hideCallout();
    Toast.show({
      type: d.chosed ? "success" : "error",
      text1: d.chosed
        ? d.name + " " + t("ToastAddFavorite")
        : d.name + " " + t("ToastRemoveFavorite"),
      visibilityTime: 1500,
    });
    let object = JSON.stringify(this.state.LocationsWithChosed);
    try {
      await AsyncStorage.setItem("LocationsWithChosed", object);
    } catch (err) {
      console.log("Error onSubmit :" + err);
    }
  };

  render() {
    return (
      <View>
        <MapView
          provider={Platform.select({
            ios: "google",
            android: PROVIDER_GOOGLE,
          })}
          showsUserLocation={true}
          showsMyLocationButton={false}
          region={this.state.focusedLocation}
          customMapStyle={myStyle.GoogleMap.mapLayout}
          style={myStyle.GoogleMap.MapView}
        >
          {this.state.LocationsWithChosed
            ? this.state.LocationsWithChosed.map((d, i) => {
                return (
                  <Marker
                    ref={(ref) => {
                      this.markers[i] = ref;
                    }}
                    key={i}
                    coordinate={d.coords}
                    title={d.name}
                  >
                    <IconEntypo
                      name="map-marker-alt"
                      size={25}
                      color={d.chosed ? "#273f59" : "rgba(39, 63, 89,0.5)"}
                    />
                    <Callout
                      tooltip
                      style={myStyle.GoogleMap.Callout}
                      onPress={() => {
                        d.chosed = !d.chosed;
                        this.saveData(i, d);
                        this.forceUpdate();
                      }}
                    >
                      <View style={myStyle.GoogleMap.InButtonView}>
                        <Text style={myStyle.GoogleMap.AddFavoritesButtonText}>
                          {d.name}{" "}
                          {d.chosed
                            ? t("removeFavoriteNow")
                            : t("addFavoriteNow")}
                        </Text>
                        {d.chosed ? (
                          <IconEntypo
                            name="heart-broken"
                            size={15}
                            style={myStyle.GoogleMap.HeartIcon}
                            color="#273f59"
                          />
                        ) : (
                          <IconEntypo
                            name="heart"
                            size={15}
                            style={myStyle.GoogleMap.HeartIcon}
                            color="#273f59"
                          />
                        )}
                      </View>
                    </Callout>
                  </Marker>
                );
              })
            : null}
        </MapView>
        <Button
          containerStyle={myStyle.GoogleMap.ButtonContainer}
          buttonStyle={myStyle.GoogleMap.Button}
          title={t("impressumBackButton")}
          type="outline"
          onPress={async () => {
            Toast.show({
              type: "info",
              text1: t("getOwnLocationHeader"),
              text2: t("getOwnLocationText"),
              visibilityTime: 2000,
            });
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              console.log("Permission to access location was denied");
              return;
            }
            let location = await Location.getCurrentPositionAsync({});

            this.setState({
              focusedLocation: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
              },
            });
          }}
        >
          <MaterialIcons name="my-location" size={17} color="#273f59" />
        </Button>
        <Toast position="top" />
      </View>
    );
  }
}

export default GoolgeMap;
