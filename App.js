import React, { Component } from "react";
import { View, Text, TouchableOpacity, LogBox } from "react-native";
import Hinweis from "./components/Hinweis";
import Tutorial from "./components/Tutorial";
import HomePage from "./components/HomePage";
import Favorites from "./components/Favorites";
import Weather from "./components/Weather";
import Settings from "./components/Settings";
import i18n from "./languages/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TidesIcon from "./assets/svg/Tides";
import TidesBlueIcon from "./assets/svg/TidesBlue";
import FavoritesIcon from "./assets/svg/Favorites";
import FavoritesBlueIcon from "./assets/svg/FavoritesBlue";
import SettingsIcon from "./assets/svg/Settings";
import SettingsBlueIcon from "./assets/svg/SettingsBlue";
import WeatherBlueIcon from "./assets/svg/WeatherBlueIcon";
import WeatherWhiteIcon from "./assets/svg/WeatherWhiteIcon";

class App extends Component {
  state = {
    pageCount: "HinweisPage",
    user: null,
  };
  constructor(props) {
    super(props);
    this.getData();
  }
  componentDidUpdate() {
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
      "Can't perform a React state update on an unmounted component.",
    ]);
  }

  saveData = async (value) => {
    this.setState({ pageCount: value });
    try {
      await AsyncStorage.setItem("pageCount", value);
    } catch (err) {
      console.log("Error onSubmit :" + err);
    }
  };

  getData = async () => {
    try {
      const asyncPageCount = await AsyncStorage.getItem("pageCount");
      if (asyncPageCount !== null) {
        this.setState({ pageCount: asyncPageCount });
      }
    } catch (err) {
      console.log("Error get Data :" + err);
    }
  };

  render() {
    const Tab = createBottomTabNavigator();
    const MyTheme = {
      dark: true,
      elevation: 0, // <-- this is the solution

      colors: {
        background: "transparent",
      },
    };
    switch (this.state.pageCount) {
      case "HinweisPage":
        return (
          <Hinweis
            startTutorial={() => {
              this.saveData("TutorialPage");
            }}
          ></Hinweis>
        );
      case "TutorialPage":
        return (
          <Tutorial
            goAhead={() => {
              this.saveData("HomePage");
            }}
          ></Tutorial>
        );
      case "HomePage":
        return (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: "rgb(100, 181, 246)",
                  opacity: 0.5,
                  elevation: 0,
                  position: "absolute",
                  borderTopWidth: 0,
                },
              }}
            >
              <Tab.Screen
                name="HomePage"
                options={{
                  tabBarIcon: ({ focused }) =>
                    focused ? <TidesBlueIcon /> : <TidesIcon />,
                }}
                component={HomePage}
              />
              <Tab.Screen
                name="Favorites"
                options={{
                  tabBarIcon: ({ focused }) =>
                    focused ? <FavoritesBlueIcon /> : <FavoritesIcon />,
                }}
                component={Favorites}
              />
              <Tab.Screen
                name="Weather"
                options={{
                  tabBarIcon: ({ focused }) =>
                    focused ? <WeatherBlueIcon /> : <WeatherWhiteIcon />,
                }}
                component={Weather}
              />
              <Tab.Screen
                name="Settings"
                options={{
                  tabBarIcon: ({ focused }) =>
                    focused ? <SettingsBlueIcon /> : <SettingsIcon />,
                }}
                component={Settings}
              />
            </Tab.Navigator>
          </NavigationContainer>
        );
      default:
        return (
          <View>
            <TouchableOpacity
              style={{
                width: 200,
                height: 50,
                alignSelf: "center",
                backgroundColor: "lightblue",
                marginTop: 40,
                justifyContent: "center",
              }}
              onPress={() => {
                this.setState({ pageCount: "HinweisPage" });
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 20,
                }}
              >
                Nichts
              </Text>
            </TouchableOpacity>
            <Text>{this.state.pageCount}</Text>
          </View>
        );
        break;
    }
  }
}

export default App;
