import { StatusBar } from "expo-status-bar";
import { View, Image, Animated } from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import _ from "lodash";
import Orte from "./Orte";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

class HomePage extends Component {
  state = {
    LocationsWithChosed: [],
    ChoosedBackground: null,
    animation: new Animated.Value(0),
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
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

  changeBackground(event) {
    if (this.state.ChoosedBackground != event) {
      this.state.animation.setValue(event == "low" ? 0 : 1);
      Animated.timing(this.state.animation, {
        toValue: event == "low" ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      this.setState({ ChoosedBackground: event });
    }
  }

  render() {
    const Tab = createMaterialTopTabNavigator();
    const filtertLocations = _.filter(this.state.LocationsWithChosed, {
      chosed: true,
    });
    return (
      <View style={myStyle.HomePage.View}>
        <Animated.Image
          style={myStyle.HomePage.AnimatedBackgroundImage}
          source={require("../assets/pictures/default_background-dashboard.jpg")}
        />
        <Animated.Image
          style={[
            myStyle.HomePage.AnimatedBackgroundImage,
            {
              opacity: _.isEmpty(filtertLocations) ? 0 : this.state.animation,
            },
          ]}
          source={require("../assets/pictures/default_background-dashboard-ebbe.jpg")}
        />
        {filtertLocations.length < 1 ? (
          <Image
            style={myStyle.HomePage.Tutorial}
            source={require("../assets/pictures/Homepage_de_Shadow.png")}
          />
        ) : null}
        {filtertLocations.length != 0 ? (
          <Tab.Navigator
            sceneContainerStyle={myStyle.HomePage.SceneContainerStyle}
            screenOptions={
              myStyle.HomePage.ScreenOptions
            }
          >
            {filtertLocations.map((d, i) => {
              return (
                <Tab.Screen
                  initialParams={{
                    LocationsWithChosed: d,
                    completeArrayLocationsWithChosed:
                      filtertLocations.length - 1 == i ? true : false,
                    changeBackground: this.changeBackground.bind(this),
                  }}
                  options={{
                    tabBarLabel:
                      filtertLocations.length > 6 ? "" : d.name.slice(0, 3),
                  }}
                  key={i}
                  name={d.name}
                  component={Orte}
                />
              );
            })}
          </Tab.Navigator>
        ) : null}
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default HomePage;
