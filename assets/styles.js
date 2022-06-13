import { StyleSheet, StatusBar, Dimensions } from "react-native";

const styles = StyleSheet.create({
  HinweisView: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "#42A5F5",
  },
  HinweisText: {
    alignSelf: "center",
    color: "white",
  },
  HinweisTouchableOpacity: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 150,
    height: 34,
    left: Dimensions.get("screen").width / 2 - 75,
    backgroundColor: "#64B5F6",
  },
  HinweisInfoText: {
    height: 180,
  },
  HinweisSpracheText: {
    color: "white",
    fontSize: 17,
  },
  HinweisIconSpaceView: {
    left: 50,
    width: 15,
    height: 24,
  },
  HinweisButtonBottom: {
    width: Dimensions.get("screen").width / 2,
    height: 50,
    position: "absolute",
    top: Dimensions.get("window").height - 50 + StatusBar.currentHeight,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  TutorialAgreeButton: {
    height: 50,
    width: Dimensions.get("screen").width,
    position: "absolute",
    top: Dimensions.get("window").height - 50 + StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBDEFB",
  },
  TutorialIcon: {
    height: 70,
    width: 70,
    alignSelf: "center",
    marginTop: 60,
  },

  // HomePage
  AnimatedBackgroundImage: {
    flex: 1,
    position: "absolute",
  },
  HomePageTutorial: {
    width: 292,
    height: 116,
    position: "absolute",
    bottom: 50,
    alignSelf: "flex-end",
    marginRight: 20,
  },

  OrteTodayBar: {
    width: Dimensions.get("screen").width,
    height: 50,
    marginTop: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  OrteBar: {
    backgroundColor: "#64B5F6",
    width: Dimensions.get("screen").width,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  OrteDayText: {
    color: "#BBDEFB",
    marginLeft: 20,
    fontSize: 15,
  },
  OrteHeader: {
    fontSize: 35,
    marginTop: 60,
    alignSelf: "center",
    color: "white",
  },
  OrteWeatherContentView: {
    height: 300,
  },
  LocationsScrollView: {
    marginTop: -26,
    marginBottom: 50,
  },
  LocationsInputContainer: {
    marginHorizontal: 20,
    width: Dimensions.get("screen").width - 40,
    marginTop: StatusBar.currentHeight,
  },
  LocationsInputInputContainer: {
    borderColor: "#3f444d",
  },

  // WeatherOrte.js
  WeatherAnimatedView: {
    bottom: 0,
    position: "absolute",
  },
  WeatherLineChart: {
    bottom: -9,
    paddingRight: 50,
  },
  LineChartXAxis: {
    width: Dimensions.get("screen").width - 50,
    backgroundColor: "rgba(0, 0, 0,0.1)",
    marginLeft: 50,
  },
  LineChartXAxisNumbers: {
    marginLeft: 50,
    marginRight: 5,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  LineChartXAxisEachNumber: {
    alignSelf: "center",
    color: "rgba(0, 0, 0,1)",
  },
  TimeIconTemperaturComponent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("screen").width,
    top: 0,
    position: "absolute",
    alignSelf: "center",
  },
  WeatherTimerText: {
    fontSize: 16,
    alignSelf: "center",
    color: "rgba(0, 0, 0,0.9)",
  },
  WeatherIcon: { width: 100, height: 100 },
  WeatherTemperatureView: { alignSelf: "center" },
  WeatherTemperatureText: {
    alignSelf: "center",
    fontSize: 20,
    color: "rgba(0, 0, 0,0.9)",
  },
  WeatherDiscriptionText: {
    alignSelf: "center",
    fontSize: 16,
    color: "rgba(0, 0, 0,0.9)",
  },
  AnimatedViewRainWind: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("screen").width,
    top: 107,
    position: "absolute",
    alignSelf: "center",
  },
  WeatherRainWindView: { flexDirection: "row" },
  WeatherRainWindText: {
    fontSize: 16,
    alignSelf: "center",
    color: "rgba(0, 0, 0,0.9)",
  },
});
export default styles;
