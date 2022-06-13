import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import React, { Component } from "react";
import moment from "moment";
import myStyle from "../assets/styles";
import { Translation } from "react-i18next";
import _UpdateApiDatacopy from "../functions/updateApiData";
import { LineChart } from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";

class Orte extends Component {
  state = {
    BackgroundEventIdentifier: null,
    LocationsWithChosed: {},
    tidesObject: {},
    useableDays: [1, 2, 3, 4],
    pressedDay: 0,
    firstFocus: true,
    currentTide: 0,
    tidesIconAnimation: new Animated.Value(Dimensions.get("screen").width),
    WeatherIconAnimation: new Animated.Value(0),
    WeatherIcon: require("../assets/pictures/Weather/clear-day.png"),
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let date = moment().format("DDMMYYYY");
    const { navigation, route, isFocused } = this.props;
    navigation.addListener("focus", () => {
      this.state.firstFocus
        ? this.updateApiData(route.params.LocationsWithChosed, date)
        : route.params.changeBackground(this.state.BackgroundEventIdentifier);
      this.setState({ firstFocus: false });
    });
    if (isFocused) {
      this.updateApiData(route.params.LocationsWithChosed, date);
      this.setState({ firstFocus: false });
    }
    this.setState({ LocationsWithChosed: route.params.LocationsWithChosed });
  }

  async updateApiData(object, date) {
    const { route } = this.props;
    this.state.WeatherIconAnimation.setValue(0);
    let ApiData = await _UpdateApiDatacopy(object, date);
    Animated.parallel([
      Animated.timing(this.state.tidesIconAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.WeatherIconAnimation, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    this.setState({
      currentTide: ApiData.currentTide,
      tidesObject: ApiData.tidesObject,
      WeatherIcon: ApiData.WeatherIcon,
      TemperatureArray: ApiData.TemperatureArray,
      TemperatureArrayGanzzahl: ApiData.TemperatureArrayGanzzahl,
    });
    ApiData.BackgroundEventIdentifier
      ? this.setState({
          BackgroundEventIdentifier: ApiData.BackgroundEventIdentifier,
        })
      : null;
    route.params.changeBackground(
      ApiData.BackgroundEventIdentifier
        ? ApiData.BackgroundEventIdentifier
        : this.state.BackgroundEventIdentifier
    );
    return ApiData;
  }

  render() {
    return (
      <Translation>
        {(t) => (
          <View>
            {/* OrtsÜberschrift ################################################################################################################################################################################################################################################################################################################################## */}
            <Text style={myStyle.OrteHeader}>
              {this.state.LocationsWithChosed.name}
            </Text>
            {this.state.useableDays.map((d, i) => {
              return (
                <View key={i}>
                  {/* TagesButtonList ################################################################################################################################################################################################################################################################################################################################## */}
                  <TouchableOpacity
                    style={myStyle.OrteBar}
                    onPress={() => {
                      this.state.tidesIconAnimation.setValue(
                        Dimensions.get("screen").width
                      );
                      this.setState({ pressedDay: i });
                      let Datehere = new Date(
                        new Date().getTime() + (1000 * 60 * 60 * 24 * i + 1)
                      );
                      let nextDate =
                        Datehere.getDate() < 10
                          ? "0" + Datehere.getDate().toString()
                          : Datehere.getDate().toString();
                      nextDate =
                        nextDate +
                        (Datehere.getMonth() + 1 < 10
                          ? "0" + (Datehere.getMonth() + 1).toString()
                          : (Datehere.getMonth() + 1).toString());
                      nextDate = nextDate + Datehere.getFullYear().toString();

                      this.updateApiData(
                        this.state.LocationsWithChosed,
                        nextDate
                      );
                    }}
                  >
                    <Text style={myStyle.OrteDayText}>
                      {t(
                        new Date().getDay() + i > 6
                          ? new Date().getDay() - 7 + i
                          : new Date().getDay() + i
                      )}
                    </Text>
                    <Text
                      style={[
                        myStyle.OrteDayText,
                        { color: "#2196F3", marginLeft: 10 },
                      ]}
                    >
                      {i < 3
                        ? i == 0
                          ? t("today")
                          : i == 1
                          ? t("tomorrow")
                          : t("afterTomorrow")
                        : ""}{" "}
                      {t(
                        new Date(
                          new Date().getTime() + (1000 * 60 * 60 * 24 * i + 1)
                        )
                          .toString()
                          .slice(4, 7)
                      )}{" "}
                      {new Date(
                        new Date().getTime() + (1000 * 60 * 60 * 24 * i + 1)
                      )
                        .toString()
                        .slice(8, 10)}
                      ,{" "}
                      {new Date(
                        new Date().getTime() + (1000 * 60 * 60 * 24 * 1 + i)
                      )
                        .toString()
                        .slice(11, 15)}
                    </Text>
                  </TouchableOpacity>
                  {/* Tides Component ################################################################################################################################################################################################################################################################################################################################## */}
                  {this.state.pressedDay == i ? (
                    <View key={i} style={myStyle.OrteWeatherContentView}>
                      {/* TidesIcons/TideTime ################################################################################################################################################################################################################################################################################################################################## */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        {!this.state.tidesObject.hasOwnProperty("success")
                          ? null
                          : this.state.tidesObject.success.tides.map((o, a) => {
                              return (
                                <Animated.View
                                  key={a}
                                  style={{
                                    transform: [
                                      {
                                        translateX: this.state
                                          .tidesIconAnimation,
                                      },
                                    ],
                                  }}
                                >
                                  <Image
                                    key={a}
                                    source={
                                      i == 0
                                        ? this.state.currentTide == a
                                          ? o.event.identifier == "low"
                                            ? require("../assets/pictures/downGifGlitch.gif")
                                            : require("../assets/pictures/upGifGlitch.gif")
                                          : o.event.identifier == "low"
                                          ? require("../assets/pictures/downGif.gif")
                                          : require("../assets/pictures/upGif.gif")
                                        : o.event.identifier == "low"
                                        ? require("../assets/pictures/downGif.gif")
                                        : require("../assets/pictures/upGif.gif")
                                    }
                                    style={[
                                      myStyle.TutorialIcon,
                                      { marginTop: 20 },
                                    ]}
                                  />
                                  <Text
                                    style={{
                                      marginBottom: 10,
                                      alignSelf: "center",
                                      color: "rgba(0, 0, 0,0.5)",
                                    }}
                                  >
                                    {o.time}
                                  </Text>
                                </Animated.View>
                              );
                            })}
                      </View>
                      {/* Diagramm ################################################################################################################################################################################################################################################################################################################################## */}
                      <Animated.View
                        style={{
                          bottom: 0,
                          opacity: this.state.WeatherIconAnimation,
                          position: "absolute",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "rgba(0, 0, 0,0.3)",
                            height: 2,
                            width: Dimensions.get("screen").width,
                          }}
                        ></View>
                        <LineChart
                          data={{
                            labels: [
                              "00:00",
                              "06:00",
                              "12:00",
                              "18:00",
                              "24:00",
                            ],
                            datasets: [
                              {
                                data: this.state.TemperatureArray
                                  ? this.state.TemperatureArray
                                  : [1, 2],
                              },
                            ],
                          }}
                          width={Dimensions.get("window").width + 45}
                          height={100}
                          hideLegend={false}
                          withInnerLines={false}
                          withOuterLines={false}
                          withVerticalLabels={true}
                          withHorizontalLabels={true}
                          withDots={false}
                          chartConfig={{
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0,0.4)`,
                            labelColor: (opacity = 1) => `black`,
                          }}
                          style={{
                            bottom: -9,
                            paddingRight: 0,
                          }}
                        />
                        <View
                          style={{
                            width: Dimensions.get("screen").width,
                            backgroundColor: "rgba(0, 0, 0,0.1)",
                          }}
                        >
                          <View
                            style={{
                              marginLeft: 90,
                              marginRight: 5,
                              height: 50,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "rgba(0, 0, 0,1)",
                              }}
                            >
                              06:00
                            </Text>
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "rgba(0, 0, 0,1)",
                              }}
                            >
                              12:00
                            </Text>
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "rgba(0, 0, 0,1)",
                              }}
                            >
                              18:00
                            </Text>
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "rgba(0, 0, 0,1)",
                              }}
                            >
                              24:00
                            </Text>
                          </View>
                        </View>
                      </Animated.View>
                      {/* WeatherIcon/MaxMinTemprature ################################################################################################################################################################################################################################################################################################################################## */}
                      <Animated.Image
                        style={{
                          opacity: this.state.WeatherIconAnimation,
                          width: 70,
                          height: 70,
                          top: 130,
                          position: "absolute",
                          alignSelf: "flex-end",
                        }}
                        source={this.state.WeatherIcon}
                      />
                      <Animated.Text
                        style={{
                          marginLeft: 5,
                          opacity: this.state.WeatherIconAnimation,
                          fontSize: 15,
                          color: "rgba(0, 0, 0,1)",
                          width: 70,
                          height: 70,
                          top: 140,
                          position: "absolute",
                          alignSelf: "flex-start",
                        }}
                      >
                        {this.state.TemperatureArrayGanzzahl
                          ? Math.max(...this.state.TemperatureArrayGanzzahl)
                          : ""}
                        °C
                      </Animated.Text>
                      <Animated.Text
                        style={{
                          marginLeft: 5,
                          opacity: this.state.WeatherIconAnimation,
                          fontSize: 15,
                          color: "rgba(0, 0, 0,1)",
                          width: 70,
                          height: 70,
                          top: 215,
                          position: "absolute",
                          alignSelf: "flex-start",
                        }}
                      >
                        {this.state.TemperatureArrayGanzzahl
                          ? Math.min(...this.state.TemperatureArrayGanzzahl)
                          : ""}
                        °C
                      </Animated.Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
            <StatusBar style="auto" />
          </View>
        )}
      </Translation>
    );
  }
}

export default function (props) {
  const isFocused = useIsFocused();
  return <Orte {...props} isFocused={isFocused} />;
}
