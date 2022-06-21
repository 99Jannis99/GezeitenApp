import { StatusBar } from "expo-status-bar";
import { View, Image, Animated } from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import { withTranslation } from "react-i18next";
import _ from "lodash";
import WeatherOrte from "./WeatherOrte";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AdMobRewarded } from "expo-ads-admob";

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
    let adUnitId = Platform.select({
      ios: "ca-app-pub-3940256099942544~1458002511",
      android: "ca-app-pub-3940256099942544/5224354917",
    });
    navigation.addListener("focus", () => {
      this.getData();
    });
    this.loadAd(adUnitId);
    console.log("CDM (Weahter)");
    this.getData();
  }

  async loadAd(UnitId) {
    await AdMobRewarded.setAdUnitID(UnitId);
    try {
      await AdMobRewarded.requestAdAsync();
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
    if (!this.state.AdMobTriggerd) {
      console.log();
      // AdMobRewarded.showAdAsync();
    }
    this.setState({
      AdMobTriggerd: true,
    });
  }

  render() {
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
          <Image
            style={myStyle.Weather.Tutorial}
            source={require("../assets/pictures/Homepage_de_Shadow.png")}
          />
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
                      filtertLocations.length > 6 ? "" : d.name.slice(0, 3),
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

export default withTranslation()(Weather);
