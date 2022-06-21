import { StatusBar } from "expo-status-bar";
import { View, Image, Animated } from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import _ from "lodash";
import Orte from "./Orte";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AdMobInterstitial } from "expo-ads-admob";

class HomePage extends Component {
  state = {
    LocationsWithChosed: [],
    ChoosedBackground: null,
    animation: new Animated.Value(0),
    AdMobTriggerd: true,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let adUnitId = Platform.select({
      ios: "ca-app-pub-3940256099942544/1033173712",
      android: "ca-app-pub-3940256099942544/1033173712",
    });
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

    this.loadAd(adUnitId);
  }

  async loadAd(UnitId) {
    await AdMobInterstitial.setAdUnitID(UnitId);
    try {
      await AdMobInterstitial.requestAdAsync();
    } catch (e) {
      console.log("Error loadAd (HomePage): ", e);
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

  AdMobTrigger() {
    if (!this.state.AdMobTriggerd) {
      AdMobInterstitial.showAdAsync();
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
      <View style={myStyle.HomePage.View}>
        <Animated.Image
          style={[myStyle.HomePage.AnimatedBackgroundImage,{opacity:0.7}]}
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
            screenOptions={myStyle.HomePage.ScreenOptions}
          >
            {filtertLocations.map((d, i) => {
              return (
                <Tab.Screen
                  initialParams={{
                    LocationsWithChosed: d,
                    changeBackground: this.changeBackground.bind(this),
                    AdMobTrigger: this.AdMobTrigger.bind(this),
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
