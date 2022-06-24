import { StatusBar } from "expo-status-bar";
import { View, Text, Animated } from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import _ from "lodash";
import WeatherOrte from "./WeatherOrte";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AdMobInterstitial } from "expo-ads-admob";
import { Button } from "@rneui/base";
import Back from "react-native-vector-icons/AntDesign";
import { t } from "i18next";

class Weather extends Component {
  state = {
    LocationsWithChosed: [],
    ChoosedBackground: "high",
    AdMobTriggerd: true,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { navigation } = this.props;
    let adUnitId;
    let AdState = "test";
    if (AdState == "test") {
      adUnitId = Platform.select({
        ios: "ca-app-pub-3940256099942544/8691691433",
        android: "ca-app-pub-3940256099942544/8691691433",
      });
    } else {
      adUnitId = Platform.select({
        ios: "ca-app-pub-8782102800192574/7215388245",
        android: "ca-app-pub-8782102800192574/7233041440",
      });
    }
    navigation.addListener("focus", () => {
      this.getData();
    });
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      AdMobInterstitial.removeAllListeners();
      setTimeout(() => this.loadAd(adUnitId), 5000);
    });
    this.loadAd(adUnitId);
    this.getData();
  }

  async loadAd(UnitId) {
    await AdMobInterstitial.setAdUnitID(UnitId);
    try {
      await AdMobInterstitial.requestAdAsync();
    } catch (e) {
      console.log("Error loadAd (Weather): ", e);
    } finally {
      this.setState({ AdMobTriggerd: false });
    }
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
  saveData = async (value) => {
    /**
    |--------------------------------------------------
    | OrtsDaten werden zum String convertiert
    |--------------------------------------------------
    */
    try {
      await AsyncStorage.setItem("Background", value);
    } catch (err) {
      console.log("Error onSubmit :" + err);
    }
  };

  AdMobTrigger() {
    if (
      !this.state.AdMobTriggerd ||
      this.state.TimeStamp != moment().format("DD")
    ) {
      try {
        AdMobInterstitial.showAdAsync();
      } catch (err) {
        console.log("showAd Error (HomePage): ", err);
      }
      this.setState({
        AdMobTriggerd: true,
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const Tab = createMaterialTopTabNavigator();
    const filtertLocations = _.filter(this.state.LocationsWithChosed, {
      chosed: true,
    });
    return (
      <View style={myStyle.Weather.View}>
        <Animated.Image
          style={myStyle.Weather.BackgroundImage}
          source={require("../assets/pictures/default_background-dashboard.jpg")}
        />
        {filtertLocations.length < 1 ? (
          <View>
            <Text style={myStyle.HomePage.AddFavoritesHeader}>
              {t("noFavorits")}
            </Text>
            <Text style={myStyle.HomePage.AddFavoritesText}>
              {t("noFavoritsAdd")}
            </Text>
            <Button
              containerStyle={myStyle.Weather.ButtonContainer}
              buttonStyle={myStyle.Weather.Button}
              title={t("impressumBackButton")}
              type="outline"
              onPress={() => {
                navigation.navigate("Favorites");
              }}
            >
              <Text style={myStyle.Weather.AddFavoritesButtonText}>
                {t("addFavorites")}
              </Text>
              <Back name="right" size={25} color="white"></Back>
            </Button>
          </View>
        ) : null}
        {filtertLocations.length != 0 ? (
          <Tab.Navigator
            sceneContainerStyle={myStyle.Weather.SceneContainerStyle}
            screenOptions={myStyle.Weather.ScreenOptions}
          >
            {filtertLocations.map((d, i) => {
              return (
                <Tab.Screen
                  initialParams={{
                    LocationsWithChosed: d,
                    AdMobTrigger: this.AdMobTrigger.bind(this),
                  }}
                  options={{
                    tabBarLabel:
                      filtertLocations.length > 6
                        ? filtertLocations.length > 9
                          ? "•"
                          : "○"
                        : d.name.slice(0, 3),
                  }}
                  key={i}
                  name={d.name}
                  component={WeatherOrte}
                />
              );
            })}
          </Tab.Navigator>
        ) : (
          <View />
        )}

        <StatusBar style="auto" />
      </View>
    );
  }
}

export default Weather;
