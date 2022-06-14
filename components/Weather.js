import { StatusBar } from "expo-status-bar";
import { View, Image, Animated } from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import { withTranslation } from "react-i18next";
import _ from "lodash";
import WeatherOrte from "./WeatherOrte";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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
