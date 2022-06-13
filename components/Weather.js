import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
} from "react-native";
import React, { Component, useEffect } from "react";
import myStyle from "../assets/styles";
import { withTranslation } from "react-i18next";
import _, { get, isEmpty, find, filter, has, debounce, sortBy } from "lodash";
import WeatherOrte from "./WeatherOrte";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

class Weather extends Component {
  state = {
    LocationsWithChosed: [],
    ChoosedBackground: "high",
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { navigation } = this.props;
    navigation.addListener("focus", () => {
      this.getData();
    });
    this.getData();
  }

  getData = async () => {
    try {
      let asyncLocationsWithChosed = await AsyncStorage.getItem(
        "LocationsWithChosed"
      );
      if (asyncLocationsWithChosed !== null) {
        asyncLocationsWithChosed = JSON.parse(asyncLocationsWithChosed);
        this.setState({ LocationsWithChosed: asyncLocationsWithChosed });
      }
    } catch (err) {
      console.log("Error get Data :" + err);
    }
  };
  saveData = async (value) => {
    // OrtsDaten werden zum String convertiert
    try {
      await AsyncStorage.setItem("Background", value);
    } catch (err) {
      console.log("Error onSubmit :" + err);
    }
  };
  render() {
    const { t } = this.props;
    const Tab = createMaterialTopTabNavigator();
    const filtertLocations = _.filter(this.state.LocationsWithChosed, {
      chosed: true,
    });
    return (
      <View style={{ height: "100%", width: "100%" }}>
        {/* <ImageBackground
          source={require("../assets/pictures/default_background-dashboard.jpg")}
          resizeMode="cover"
          style={{
            flex: 1,
            // opacity: this.state.animation,
          }}
        > */}
       
        <Animated.Image
          style={{
            flex: 1,
            position: "absolute",
          }}
          source={require("../assets/pictures/default_background-dashboard.jpg")}
        />
        {filtertLocations.length < 1 ? (
          <Image
            style={{
              width: 292,
              height: 116,
              position: "absolute",
              bottom: 50,
              alignSelf: "flex-end",
              marginRight: 20,
            }}
            source={require("../assets/pictures/Homepage_de_Shadow.png")}
          />
        ) : null}
        {filtertLocations.length != 0 ? (
          <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: "rgb(187, 222, 251,0)" }}
            screenOptions={{
              tabBarShowLabel: false,
              tabBarItemStyle: { color: "Red" },
              tabBarStyle: { backgroundColor: "#90CAF9" },
            }}
          >
            {filtertLocations.map((d, i) => {
              return (
                <Tab.Screen
                  initialParams={{
                    LocationsWithChosed: d,
                    completeArrayLocationsWithChosed:
                      filtertLocations.length - 1 == i ? true : false,
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
