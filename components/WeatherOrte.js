import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import { Translation } from "react-i18next";
import { LineChart } from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";
import _UpdateApiData from "../functions/updateApiData";
import AsyncStorage from "@react-native-async-storage/async-storage";

class WeatherOrte extends Component {
  state = {
    LocationsWithChosed: {},
    useableDays: [1, 2, 3],
    pressedDay: 0,
    firstFocus: true,
    countLoadedComponents: 0,
    WeatherIconAnimation: new Animated.Value(0),
    WeatherIcon: require("../assets/pictures/Weather/clear-day.png"),
    choosedDayButton: [false, false, false, false, false, false, false],
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let date = moment().format("DDMMYYYY");
    const { navigation, route, isFocused } = this.props;
    navigation.addListener("focus", () => {
      route.params.AdMobTrigger();
      if (this.state.firstFocus) {
        this.updateApiData(route.params.LocationsWithChosed, date, true);
        this.setState({ firstFocus: false });
      }
      this.getData();
    });
    if (isFocused) {
      this.updateApiData(route.params.LocationsWithChosed, date);
      this.getData();
      this.setState({
        firstFocus: false,
      });
    }
    this.setState({ LocationsWithChosed: route.params.LocationsWithChosed });
  }

  getData = async () => {
    try {
      let asyncLocationView = await AsyncStorage.getItem("locationView");
      if (asyncLocationView !== null) {
        this.setState({
          useableDays: JSON.parse("[" + asyncLocationView + "]"),
        });
      }
    } catch (err) {
      console.log("Error get Data :" + err);
    }
  };

  async updateApiData(object, date, focusedRightNow) {
    focusedRightNow ? null : this.state.WeatherIconAnimation.setValue(0);

    let ApiData = await _UpdateApiData(object, date);
    Animated.timing(this.state.WeatherIconAnimation, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start();

    this.setState({
      WeatherIcon: ApiData.WeatherIcon,
      WeatherNowDescription: ApiData.WeatherNowDescription,
      TemperatureArray: ApiData.TemperatureArray,
    });
    // console.log(ApiData.WeatherNowDescription);
    return ApiData;
  }
  render() {
    const { route } = this.props;
    return (
      <Translation>
        {(t) => (
          <View>
            {/**
            |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
            | OrtsÜberschrift
            |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
            */}
            <Text style={myStyle.WeatherOrte.Header}>
              {this.state.LocationsWithChosed.name}
            </Text>
            <ScrollView style={myStyle.WeatherOrte.ScrollView}>
              {this.state.useableDays.map((d, i) => {
                return (
                  <View key={i}>
                    {/**
                  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                  | TagesButtonList
                  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                  */}
                    <TouchableOpacity
                      style={[
                        myStyle.WeatherOrte.TouchableOpacity,
                        {
                          backgroundColor: this.state.choosedDayButton[i]
                            ? "#273f59"
                            : i == 0
                            ? "#5497a7"
                            : "white",
                        },
                      ]}
                      onPress={() => {
                        route.params.AdMobTrigger();
                        let newChoosedDayButton = [
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ];
                        i !== 0 ? (newChoosedDayButton[i] = true) : null;
                        this.setState({
                          pressedDay: i,
                          choosedDayButton: newChoosedDayButton,
                        });
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
                      <Text
                        style={[
                          myStyle.WeatherOrte.DayText,
                          {
                            color: this.state.choosedDayButton[i]
                              ? "white"
                              : i == 0
                              ? "white"
                              : "#273f59",
                          },
                        ]}
                      >
                        {t(
                          new Date().getDay() + i > 6
                            ? new Date().getDay() - 7 + i
                            : new Date().getDay() + i
                        )}
                      </Text>
                      <Text
                        style={[
                          myStyle.WeatherOrte.DateText,
                          {
                            color: this.state.choosedDayButton[i]
                              ? "#5497a7"
                              : i == 0
                              ? "#273f59"
                              : "#5497a7",
                          },
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
                    {/**
                  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                  | Weather Component
                  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                  */}
                    {this.state.pressedDay == i ? (
                      <View
                        key={i}
                        style={myStyle.WeatherOrte.WeatherComponentView}
                      >
                        {/**
                      |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                      | Diagramm
                      |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                      */}
                        <Animated.View
                          style={[
                            myStyle.WeatherOrte.DiagrammAnimatedView,
                            {
                              opacity: this.state.WeatherIconAnimation,
                            },
                          ]}
                        >
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
                            yAxisSuffix="°C"
                            segments={2}
                            withVerticalLabels={true}
                            withHorizontalLabels={true}
                            withDots={false}
                            chartConfig={{
                              decimalPlaces: 0,
                              backgroundGradientFromOpacity: 0,
                              backgroundGradientToOpacity: 0,
                              color: (opacity = 1) => `rgba(0, 0, 0,0.4)`,
                              labelColor: (opacity = 1) => `black`,
                            }}
                            style={myStyle.WeatherOrte.LineChart}
                          />
                          <View style={myStyle.WeatherOrte.DiagrammTimesView}>
                            <View
                              style={
                                myStyle.WeatherOrte.DiagrammTimesSecondView
                              }
                            >
                              <Text style={myStyle.WeatherOrte.DiagrammTime}>
                                06:00
                              </Text>
                              <Text style={myStyle.WeatherOrte.DiagrammTime}>
                                12:00
                              </Text>
                              <Text style={myStyle.WeatherOrte.DiagrammTime}>
                                18:00
                              </Text>
                              <Text style={myStyle.WeatherOrte.DiagrammTime}>
                                24:00
                              </Text>
                            </View>
                          </View>
                        </Animated.View>
                        {/**
                      |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                      | Uhr/Icon/Grad
                      |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
                      */}
                        <Animated.View
                          style={[
                            myStyle.WeatherOrte.TimeIconTemperaturComponent,
                            {
                              opacity: this.state.WeatherIconAnimation,
                            },
                          ]}
                        >
                          <Text style={myStyle.WeatherOrte.WeatherTimerText}>
                            {this.state.WeatherNowDescription
                              ? this.state.WeatherNowDescription.temperature
                                ? this.state.WeatherNowDescription.time.slice(
                                    11,
                                    16
                                  )
                                : t("wholeDay")
                              : null}
                          </Text>
                          <Image
                            style={myStyle.WeatherOrte.WeatherIcon}
                            source={this.state.WeatherIcon}
                          />
                          <View
                            style={myStyle.WeatherOrte.WeatherTemperatureView}
                          >
                            <Text
                              style={myStyle.WeatherOrte.WeatherTemperatureText}
                            >
                              {this.state.WeatherNowDescription
                                ? (this.state.WeatherNowDescription.temperature
                                    ? this.state.WeatherNowDescription
                                        .temperature
                                    : this.state.WeatherNowDescription
                                        .apparentTemperatureHigh
                                  )
                                    .toString()
                                    .slice(0, 2) + " °C"
                                : null}
                            </Text>
                            <Text
                              style={myStyle.WeatherOrte.WeatherDiscriptionText}
                            >
                              {this.state.WeatherNowDescription
                                ? t(this.state.WeatherNowDescription.icon)
                                : null}
                            </Text>
                          </View>
                        </Animated.View>
                        {/**
                      |--------------------------------------------------
                      | Regenwahrscheinlichkeit/Menge/Windstärke
                      |--------------------------------------------------
                      */}
                        <Animated.View
                          style={[
                            myStyle.WeatherOrte.AnimatedViewRainWind,
                            {
                              opacity: this.state.WeatherIconAnimation,
                            },
                          ]}
                        >
                          <View style={myStyle.WeatherOrte.ViewRainWind}>
                            <IconFontAwesome
                              name="umbrella"
                              size={20}
                              color="#3f444d"
                            />
                            <Text
                              style={myStyle.WeatherOrte.WeatherRainWindText}
                            >
                              {this.state.WeatherNowDescription
                                ? " " +
                                  (
                                    this.state.WeatherNowDescription
                                      .precipProbability * 100
                                  ).toFixed(0) +
                                  "%"
                                : null}
                            </Text>
                          </View>
                          <View style={myStyle.WeatherOrte.WeatherRainWindView}>
                            <IconEntypo
                              name="water"
                              size={20}
                              color="#3f444d"
                            />
                            <Text
                              style={myStyle.WeatherOrte.WeatherRainWindText}
                            >
                              {this.state.WeatherNowDescription
                                ? " " +
                                  this.state.WeatherNowDescription
                                    .precipIntensity +
                                  " l/m2"
                                : null}
                            </Text>
                          </View>
                          <View style={myStyle.WeatherOrte.ViewRainWind}>
                            <IconMaterialCommunityIcons
                              name="wind-turbine"
                              size={20}
                              color="#3f444d"
                            />
                            <Text
                              style={myStyle.WeatherOrte.WeatherRainWindText}
                            >
                              {this.state.WeatherNowDescription
                                ? " " +
                                  this.state.WeatherNowDescription.windSpeed +
                                  " km/h"
                                : null}
                            </Text>
                          </View>
                        </Animated.View>
                      </View>
                    ) : null}
                  </View>
                );
              })}
              <StatusBar style="auto" />
            </ScrollView>
          </View>
        )}
      </Translation>
    );
  }
}

export default function (props) {
  const isFocused = useIsFocused();

  return <WeatherOrte {...props} isFocused={isFocused} />;
}
