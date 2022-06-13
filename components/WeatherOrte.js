import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
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

class WeatherOrte extends Component {
  state = {
    LocationsWithChosed: {},
    useableDays: [1, 2, 3, 4],
    pressedDay: 0,
    firstFocus: true,
    countLoadedComponents: 0,
    WeatherIconAnimation: new Animated.Value(0),
    WeatherIcon: require("../assets/pictures/Weather/clear-day.png"),
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let date = moment().format("DDMMYYYY");
    const { navigation, route, isFocused } = this.props;
    navigation.addListener("focus", () => {
      if (this.state.firstFocus) {
        this.updateApiData(route.params.LocationsWithChosed, date, true);
        this.setState({ firstFocus: false });
      }
    });
    if (isFocused) {
      this.updateApiData(route.params.LocationsWithChosed, date);
      this.setState({ firstFocus: false });
    }
    this.setState({ LocationsWithChosed: route.params.LocationsWithChosed });
  }

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
                  {/* TagesButtonList ##################################################################################################################################################################################################################################################################################################################################*/}
                  <TouchableOpacity
                    style={myStyle.OrteBar}
                    onPress={() => {
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

                  {/* Weather Component ##################################################################################################################################################################################################################################################################################################################################*/}

                  {this.state.pressedDay == i ? (
                    <View key={i} style={myStyle.OrteWeatherContentView}>
                      {/* Diagramm ################################################################################################################################################################# */}
                      <Animated.View
                        style={[
                          myStyle.WeatherAnimatedView,
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
                          style={myStyle.WeatherLineChart}
                        />
                        <View style={myStyle.LineChartXAxis}>
                          <View style={myStyle.LineChartXAxisNumbers}>
                            <Text style={myStyle.LineChartXAxisEachNumber}>
                              06:00
                            </Text>
                            <Text style={myStyle.LineChartXAxisEachNumber}>
                              12:00
                            </Text>
                            <Text style={myStyle.LineChartXAxisEachNumber}>
                              18:00
                            </Text>
                            <Text style={myStyle.LineChartXAxisEachNumber}>
                              24:00
                            </Text>
                          </View>
                        </View>
                      </Animated.View>
                      {/* Uhr/Icon/Grad ################################################################################################################################################################################################################################################################################################################################## */}
                      <Animated.View
                        style={[
                          myStyle.TimeIconTemperaturComponent,
                          {
                            opacity: this.state.WeatherIconAnimation,
                          },
                        ]}
                      >
                        <Text style={myStyle.WeatherTimerText}>
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
                          style={myStyle.WeatherIcon}
                          source={this.state.WeatherIcon}
                        />
                        <View style={myStyle.WeatherTemperatureView}>
                          <Text style={myStyle.WeatherTemperatureText}>
                            {this.state.WeatherNowDescription
                              ? (this.state.WeatherNowDescription.temperature
                                  ? this.state.WeatherNowDescription.temperature
                                  : this.state.WeatherNowDescription
                                      .apparentTemperatureHigh
                                )
                                  .toString()
                                  .slice(0, 2) + " °C"
                              : null}
                          </Text>
                          <Text style={myStyle.WeatherDiscriptionText}>
                            {this.state.WeatherNowDescription
                              ? t(this.state.WeatherNowDescription.icon)
                              : null}
                          </Text>
                        </View>
                      </Animated.View>
                      {/* Regenwahrscheinlichkeit/Menge/Windstärke ################################################################################################################################################################################################################################################################################################################################## */}
                      <Animated.View
                        style={[
                          myStyle.AnimatedViewRainWind,
                          {
                            opacity: this.state.WeatherIconAnimation,
                          },
                        ]}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <IconFontAwesome
                            name="umbrella"
                            size={20}
                            color="#3f444d"
                          />
                          <Text style={myStyle.WeatherRainWindText}>
                            {this.state.WeatherNowDescription
                              ? " " +
                                this.state.WeatherNowDescription
                                  .precipProbability *
                                  100 +
                                "%"
                              : null}
                          </Text>
                        </View>
                        <View style={myStyle.WeatherRainWindView}>
                          <IconEntypo name="water" size={20} color="#3f444d" />
                          <Text style={myStyle.WeatherRainWindText}>
                            {this.state.WeatherNowDescription
                              ? " " +
                                this.state.WeatherNowDescription
                                  .precipIntensity +
                                " l/m2"
                              : null}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <IconMaterialCommunityIcons
                            name="wind-turbine"
                            size={20}
                            color="#3f444d"
                          />
                          <Text style={myStyle.WeatherRainWindText}>
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
