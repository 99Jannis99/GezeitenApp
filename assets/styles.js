import { StyleSheet, StatusBar, Dimensions } from "react-native";

const styles = {
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Hinweis Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Hinweis: {
    View: { flex: 1 },
    HeadlineText: {
      fontSize: 35,
      top: StatusBar.currentHeight,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    SecondHeadlineText: {
      fontSize: 25,
      marginTop: 60,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    InfoView: { height: 180 },
    InfoText: {
      marginLeft: 20,
      marginRight: 20,
      fontSize: 15,
      marginTop: 30,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    LanguageChoice: {
      fontSize: 21,
      marginTop: 55,
      marginBottom: 10,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    TouchableOpacity: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
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
    IconSpaceView: { left: 50, width: 15, height: 24 },
    SpracheText: { color: "white", fontSize: 17 },
    ButtonBottomLeft: {
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
      backgroundColor: "#BBDEFB",
    },
    ButtonBottomRight: {
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
      right: 0,
      backgroundColor: "#1976D2",
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Tutorial Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Tutorial: {
    View: { flex: 1 },
    Headline: { fontSize: 35, top: StatusBar.currentHeight + 20 },
    Description: {
      marginTop: StatusBar.currentHeight + 40,
      fontSize: 15,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    Icon: {
      height: 70,
      width: 70,
      alignSelf: "center",
      marginTop: 60,
    },
    DescriptionDown: {
      marginLeft: 20,
      marginRight: 20,
      fontSize: 15,
      marginTop: 30,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    AgreeButton: {
      height: 50,
      width: Dimensions.get("screen").width,
      position: "absolute",
      top: Dimensions.get("window").height - 50 + StatusBar.currentHeight,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#BBDEFB",
    },
    AgreeButtonText: {
      fontSize: 17,
      alignSelf: "center",
      color: "#64B5F6",
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | HomePage Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  HomePage: {
    View: { flex: 1 },
    AnimatedBackgroundImage: { flex: 1, position: "absolute" },
    Tutorial: {
      width: 292,
      height: 116,
      position: "absolute",
      bottom: 50,
      alignSelf: "flex-end",
      marginRight: 20,
    },
    SceneContainerStyle: { backgroundColor: "rgb(187, 222, 251,0)" },
    ScreenOptions: {
      tabBarActiveTintColor: "#2196F3",
      tabBarInactiveTintColor: "#BBDEFB",
      tabBarLabelStyle: {
        marginTop: 30,
        fontWeight: "bold",
      },
      tabBarStyle: { backgroundColor: "#64B5F6" },
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Weather Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Weather: {
    View: { flex: 1 },
    BackgroundImage: { flex: 1, position: "absolute" },
    Tutorial: {
      width: 292,
      height: 116,
      position: "absolute",
      bottom: 50,
      alignSelf: "flex-end",
      marginRight: 20,
    },
    SceneContainerStyle: { backgroundColor: "rgb(187, 222, 251,0)" },
    ScreenOptions: {
      tabBarActiveTintColor: "#2196F3",
      tabBarInactiveTintColor: "#BBDEFB",
      tabBarLabelStyle: {
        marginTop: 30,
        fontWeight: "bold",
      },
      tabBarStyle: { backgroundColor: "#64B5F6" },
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Favorites Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Favorites: {
    ImageBackground: { flex: 1 },
    Image: {
      width: 292,
      height: 116,
      alignSelf: "flex-end",
      marginRight: 20,
    },
    ScrollView: {
      marginTop: -26,
      marginBottom: 50,
    },
    ListView: {
      flexDirection: "row",
    },
    SecondListView: {
      width: Dimensions.get("screen").width - 80,
    },
    ListItemTitel: {
      alignSelf: "center",
      color: "#3f444d",
    },
    InputContainer: {
      marginHorizontal: 20,
      width: Dimensions.get("screen").width - 40,
      marginTop: StatusBar.currentHeight,
    },
    InputInputContainer: {
      borderColor: "#3f444d",
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Locations Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Locations: {
    View: {
      flex: 1,
    },
    ScrollView: {
      marginTop: -26,
      marginBottom: 50,
    },
    ListView: { flexDirection: "row" },
    ListItemTitel: {
      alignSelf: "center",
      color: "#3f444d",
    },
    ChildView: { width: Dimensions.get("screen").width - 80 },
    InputContainer: {
      marginHorizontal: 20,
      width: Dimensions.get("screen").width - 40,
      marginTop: StatusBar.currentHeight,
    },
    InputInputContainer: {
      borderColor: "#3f444d",
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Orte Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Orte: {
    Header: {
      fontSize: 35,
      marginTop: 60,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    TouchableOpacity: {
      backgroundColor: "#64B5F6",
      width: Dimensions.get("screen").width,
      height: 50,
      alignItems: "center",
      flexDirection: "row",
    },
    DayText: {
      color: "#BBDEFB",
      marginLeft: 20,
      fontSize: 15,
    },
    DateText: {
      color: "#BBDEFB",
      marginLeft: 20,
      fontSize: 15,
      color: "#2196F3",
      marginLeft: 10,
    },
    TidesComponentView: {
      height: 300,
    },
    TidesIconView: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    IndividuallyTidesIcon: {
      marginTop: 20,
      height: 70,
      width: 70,
      alignSelf: "center",
    },
    TidesTimeText: {
      marginBottom: 10,
      alignSelf: "center",
      color: "rgba(0, 0, 0,0.5)",
    },
    DiagrammAnimatedView: {
      bottom: 0,
      position: "absolute",
    },
    LineChart: {
      bottom: -9,
      paddingRight: 0,
    },
    DiagrammTimesView: {
      width: Dimensions.get("screen").width,
      backgroundColor: "rgba(0, 0, 0,0.1)",
    },
    DiagrammTimesSecondView: {
      marginLeft: 90,
      marginRight: 5,
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    DiagrammTime: {
      alignSelf: "center",
      color: "rgba(0, 0, 0,1)",
    },
    WeatherIcon: {
      width: 70,
      height: 70,
      top: 130,
      position: "absolute",
      alignSelf: "flex-end",
    },
    DiagrammMaxTemp: {
      marginLeft: 5,
      fontSize: 15,
      color: "rgba(0, 0, 0,1)",
      width: 70,
      height: 70,
      top: 140,
      position: "absolute",
      alignSelf: "flex-start",
    },

    DiagrammMinTemp: {
      marginLeft: 5,
      fontSize: 15,
      color: "rgba(0, 0, 0,1)",
      width: 70,
      height: 70,
      top: 215,
      position: "absolute",
      alignSelf: "flex-start",
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | WeatherOrte Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  WeatherOrte: {
    Header: {
      fontSize: 35,
      marginTop: 60,
      alignSelf: "center",
      color: "#BBDEFB",
    },
    TouchableOpacity: {
      backgroundColor: "#64B5F6",
      width: Dimensions.get("screen").width,
      height: 50,
      alignItems: "center",
      flexDirection: "row",
    },
    DayText: {
      color: "#BBDEFB",
      marginLeft: 20,
      fontSize: 15,
    },
    DateText: {
      color: "#BBDEFB",
      marginLeft: 20,
      fontSize: 15,
      color: "#2196F3",
      marginLeft: 10,
    },
    WeatherComponentView: {
      height: 300,
    },
    DiagrammAnimatedView: {
      bottom: 0,
      position: "absolute",
    },
    LineChart: {
      bottom: -9,
      paddingRight: 50,
    },
    DiagrammTimesView: {
      width: Dimensions.get("screen").width - 50,
      backgroundColor: "rgba(0, 0, 0,0.1)",
      marginLeft: 50,
    },
    DiagrammTimesSecondView: {
      marginLeft: 50,
      marginRight: 5,
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    DiagrammTime: {
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
    WeatherIcon: {
      width: 100,
      height: 100,
    },
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
    ViewRainWind: { flexDirection: "row" },
    WeatherRainWindView: { flexDirection: "row" },
    WeatherRainWindText: {
      fontSize: 16,
      alignSelf: "center",
      color: "rgba(0, 0, 0,0.9)",
    },
  },
};
export default styles;
