import { StatusBar } from "expo-status-bar";
import { View, Animated, Text,SafeAreaView } from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import _ from "lodash";
import Orte from "./Orte";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AdMobInterstitial } from "expo-ads-admob";
import * as Network from "expo-network";
import { t } from "i18next";
import { Button } from "@rneui/base";
import Back from "react-native-vector-icons/AntDesign";
import moment from "moment";

class HomePage extends Component {
  state = {
    LocationsWithChosed: [],
    ChoosedBackground: null,
    animation: new Animated.Value(0),
    AdMobTriggerd: true,
    InternetConnection: true,
    showInternetError: { pointerEvents: "none", opacity: 0 },
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    let { navigation } = this.props;
    navigation.addListener("focus", () => {
      this.getData();
    });
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      AdMobInterstitial.removeAllListeners();
      setTimeout(() => this.loadAd(adUnitId), 5000);
    });

    this.getData();
    this.loadAd(adUnitId);
    this.setState({ TimeStamp: moment().format("DD") });
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
    let NetworkState;
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
    try {
      NetworkState = await Network.getNetworkStateAsync();
      if (NetworkState.isInternetReachable) {
        this.setState({
          showInternetError: { pointerEvents: "none", opacity: 0 },
        });
      } else {
        this.setState({
          showInternetError: { pointerEvents: "auto", opacity: 1 },
        });
      }
    } catch (error) {
      console.log("NetworkStateError: ", error);
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
    if (
      !this.state.AdMobTriggerd ||
      this.state.TimeStamp != moment().format("DD")
    ) {
      try {
      AdMobInterstitial.showAdAsync();
      } catch (err) {
        console.log("showAd Error (HomePage): ", err);
      }
    }
    this.setState({
      AdMobTriggerd: true,
    });
  }

  render() {
    const Tab = createMaterialTopTabNavigator();
    const { navigation } = this.props;
    const filtertLocations = _.filter(this.state.LocationsWithChosed, {
      chosed: true,
    });
    return (
      <View style={myStyle.HomePage.View}>
        <Animated.Image
          style={[myStyle.HomePage.AnimatedBackgroundImage, { opacity: 0.7 }]}
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
          <SafeAreaView>
            <Text style={myStyle.HomePage.AddFavoritesHeader}>
              {t("noFavorits")}
            </Text>
            <Text style={myStyle.HomePage.AddFavoritesText}>
              {t("noFavoritsAdd")}
            </Text>
            <Button
              containerStyle={myStyle.HomePage.ButtonContainer}
              buttonStyle={myStyle.HomePage.Button}
              title={t("impressumBackButton")}
              type="solid"
              onPress={() => navigation.navigate("Favorites")}
            >
              <Text style={myStyle.HomePage.AddFavoritesButtonText}>
                {t("addFavorites")}
              </Text>
              <Back name="right" size={25} color="white"></Back>
            </Button>
          </SafeAreaView>
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
                      filtertLocations.length > 6
                        ? filtertLocations.length > 9
                          ? "•"
                          : "○"
                        : d.name.slice(0, 3),
                  }}
                  key={i}
                  name={d.name}
                  component={Orte}
                />
              );
            })}
          </Tab.Navigator>
        ) : null}
        <View
          pointerEvents={this.state.showInternetError.pointerEvents}
          style={[
            myStyle.HomePage.InternetError,
            { opacity: this.state.showInternetError.opacity },
          ]}
        >
          <Text style={myStyle.HomePage.InternetErrorText}>
            {t("internetConnection")}
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default HomePage;
