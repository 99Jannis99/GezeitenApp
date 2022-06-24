import { StyleSheet, StatusBar, Dimensions } from "react-native";

const styles = {
  /**
  |--------------------------------------------------
  | App Component
  |--------------------------------------------------
  */
  App: {
    NavigatorScreenOptions: {
      tabBarShowLabel: false,
      headerShown: false,
      tabBarActiveBackgroundColor: "white",
      tabBarStyle: {
        backgroundColor: "#5497a7",
        elevation: 0,
        position: "absolute",
        borderTopWidth: 0,
      },
    },
    Impressum: {
      height: Dimensions.get("screen").height,
      width: Dimensions.get("screen").width,
      backgroundColor: "white",
      opacity: 1,
      position: "absolute",
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Hinweis Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Hinweis: {
    View: { flex: 1, position: "absolute", opacity: 0.7 },
    HeadlineText: {
      fontSize: 35,
      top: StatusBar.currentHeight,
      alignSelf: "center",
      color: "#273f59",
    },
    SecondHeadlineText: {
      fontSize: 25,
      marginTop: 60,
      alignSelf: "center",
      color: "#273f59",
    },
    InfoView: { height: 180 },
    InfoText: {
      marginLeft: 20,
      marginRight: 20,
      fontSize: 15,
      marginTop: 30,
      alignSelf: "center",
      color: "#273f59",
    },
    LanguageChoice: {
      fontSize: 21,
      marginTop: 55,
      marginBottom: 10,
      alignSelf: "center",
      color: "#273f59",
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
      backgroundColor: "#5497a7",
    },
    IconSpaceView: { left: 50, width: 15, height: 24 },
    SpracheText: { color: "#273f59", fontSize: 17 },
    DeclineText: { color: "#5497a7", fontSize: 17 },
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
      backgroundColor: "#5497a7",
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
      backgroundColor: "#273f59",
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Tutorial Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Tutorial: {
    View: { flex: 1, opacity: 0.7, position: "absolute" },
    Headline: {
      fontSize: 35,
      alignSelf: "center",
      color: "#273f59",
      top: StatusBar.currentHeight + 20,
    },
    Description: {
      marginTop: StatusBar.currentHeight + 40,
      fontSize: 15,
      alignSelf: "center",
      color: "#273f59",
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
      color: "#273f59",
    },
    AgreeButton: {
      height: 50,
      width: Dimensions.get("screen").width,
      position: "absolute",
      top: Dimensions.get("window").height - 50 + StatusBar.currentHeight,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#5497a7",
    },
    AgreeButtonText: {
      fontSize: 17,
      alignSelf: "center",
      color: "#273f59",
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
      tabBarActiveTintColor: "#273f59",
      tabBarInactiveTintColor: "white",
      tabBarLabelStyle: {
        marginTop: 30,
        fontWeight: "bold",
      },
      tabBarStyle: { backgroundColor: "#5497a7" },
    },
    InternetError: {
      marginTop: Dimensions.get("screen").height / 2 - 35,
      height: 70,
      backgroundColor: "red",
      width: Dimensions.get("screen").width,
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
    },
    InternetErrorText: {
      alignSelf: "center",
      fontWeight: "bold",
      fontSize: 20,
      color: "white",
    },
    AddFavoritesHeader: {
      top: StatusBar.currentHeight,
      fontWeight: "bold",
      color: "white",
      fontSize: 20,
      padding: 20,
      alignSelf: "center",
    },
    AddFavoritesText: {
      top: StatusBar.currentHeight,
      color: "white",
      fontSize: 15,
      padding: 20,
      alignSelf: "center",
      paddingTop: 20,
    },
    AddFavoritesButtonText: {
      color: "white",
      fontSize: 15,
    },
    Button: {
      height: 40,
      width: "100%",
      alignSelf: "center",
      backgroundColor: "#5497a7",
    },
    ButtonContainer: {
      padding: Platform.select({
        ios: 10,
        android: 40,
      }),
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
      tabBarActiveTintColor: "#273f59",
      tabBarInactiveTintColor: "white",
      tabBarLabelStyle: {
        marginTop: 30,
        fontWeight: "bold",
      },
      tabBarStyle: { backgroundColor: "#5497a7" },
    },
    AddFavoritesButtonText: {
      color: "white",
      fontSize: 15,
    },
    Button: {
      height: 40,
      width: "100%",
      alignSelf: "center",
      backgroundColor: "#5497a7",
    },
    ButtonContainer: {
      padding: Platform.select({
        ios: 10,
        android: 40,
      }),
    },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | Favorites Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  Favorites: {
    ImageBackground: { flex: 1, position: "absolute", opacity: 0.7 },
    Image: {
      width: 292,
      height: 116,
      alignSelf: "flex-end",
      marginRight: 20,
    },
    ScrollViewView: {
      height: Dimensions.get("screen").height - 223 - StatusBar.currentHeight,
      marginTop: Platform.select({
        ios: -24,
        android: -26,
      }),
      marginBottom: Platform.select({
        ios: 190,
        android: 0,
      }),
    },
    ListView: {
      flexDirection: "row",
    },
    SecondListView: {
      width: Dimensions.get("screen").width - 80,
    },
    ListItemTitel: {
      alignSelf: "center",
      color: "#273f59",
    },
    InputContainer: {
      marginHorizontal: 20,
      width: Dimensions.get("screen").width - 40,
      marginTop: StatusBar.currentHeight,
    },
    InputInputContainer: {
      borderColor: "#273f59",
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
      opacity: 0.7,
    },
    ScrollViewView: {
      height: Dimensions.get("screen").height - 223 - StatusBar.currentHeight,
      marginTop: Platform.select({
        ios: -24,
        android: -26,
      }),
      marginBottom: Platform.select({
        ios: 190,
        android: 0,
      }),
    },
    ListView: { flexDirection: "row" },
    ListItemTitel: {
      alignSelf: "center",
      color: "#273f59",
    },
    ChildView: { width: Dimensions.get("screen").width - 80 },
    InputContainer: {
      marginHorizontal: 20,
      width: Dimensions.get("screen").width - 40,
      marginTop: StatusBar.currentHeight,
    },
    InputInputContainer: {
      borderColor: "#273f59",
    },
    ButtonContainer: { paddingBottom: 10, paddingRight: 10, paddingLeft: 10 },
    Button: {
      height: 40,
      width: "100%",
      alignSelf: "center",
      borderColor: "#273f59",
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
      alignSelf: "center",
      color: "white",
      padding: 20,
    },
    TouchableOpacity: {
      width: Dimensions.get("screen").width,
      height: 50,
      alignItems: "center",
      flexDirection: "row",
    },
    DayText: {
      marginLeft: 20,
      fontSize: 15,
    },
    DateText: {
      fontSize: 15,
      marginLeft: 10,
    },
    TidesComponentView: {
      height: 350,
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
      marginTop: 10,
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
      top: 180,
      position: "absolute",
      alignSelf: "flex-end",
    },
    DiagrammMaxTemp: {
      marginLeft: 5,
      fontSize: 15,
      color: "rgba(0, 0, 0,1)",
      width: 70,
      height: 70,
      top: 220,
      position: "absolute",
      alignSelf: "flex-start",
    },

    DiagrammMinTemp: {
      marginLeft: 5,
      fontSize: 15,
      color: "rgba(0, 0, 0,1)",
      width: 70,
      height: 70,
      top: 295,
      position: "absolute",
      alignSelf: "flex-start",
    },
    ScrollView: { marginBottom: 130 },
  },
  /**
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  | WeatherOrte Component
  |--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------
  */
  WeatherOrte: {
    Header: {
      fontSize: 35,
      padding: 20,
      alignSelf: "center",
      color: "white",
    },
    TouchableOpacity: {
      width: Dimensions.get("screen").width,
      height: 50,
      alignItems: "center",
      flexDirection: "row",
    },
    DayText: {
      marginLeft: 20,
      fontSize: 15,
    },
    DateText: {
      fontSize: 15,
      marginLeft: 10,
    },
    WeatherComponentView: {
      height: 350,
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
      top: 127,
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
    ScrollView: { marginBottom: 130 },
  },
  /**
  |--------------------------------------------------
  | Settings Component
  |--------------------------------------------------
  */
  Settings: {
    ButtonGroupContainer: {
      marginTop: StatusBar.currentHeight,
      height: 50,
      borderWidth: 0,
    },
    ButtonGroupContainerLocationView: {
      flexDirection: "column",
      marginTop: StatusBar.currentHeight,
      height: 150,
      borderWidth: 0,
      backgroundColor: "rgba(39, 63, 89,0)",
    },
    ButtonGroupButton: { backgroundColor: "#5497a7" },
    ButtonGroupButtonView: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      width: "100%",
      alignItems: "center",
    },
    ButtonGroupButtonText: { color: "#273f59", fontSize: 15 },
    ButtonGroupButtonSelected: { backgroundColor: "white" },
    Header: {
      top: StatusBar.currentHeight,
      fontWeight: "bold",
      color: "#273f59",
      fontSize: 20,
      padding: 20,
      width: Dimensions.get("screen").width / 2,
      alignSelf: "center",
    },
    Header2: {
      top: StatusBar.currentHeight,
      fontWeight: "bold",
      color: "#273f59",
      fontSize: 20,
      padding: 20,
      alignSelf: "center",
    },
    InfoIcon: {
      position: "relative",
      marginTop: StatusBar.currentHeight,
      padding: 22,
      alignSelf: "flex-end",
    },
    HeaderView: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    InButtonView: {
      justifyContent: "flex-end",
      flexDirection: "row",
    },
    AddFavoritesButtonText: {
      color: "#273f59",
      fontSize: 15,
    },
    Button: {
      height: 40,
      width: "100%",
      alignSelf: "flex-end",
      justifyContent: "space-around",
      borderColor: "#5497a7",
      backgroundColor: "#5497a7",
    },
    ButtonContainer: {
      justifyContent: "space-between",
      padding: Platform.select({
        ios: 10,
        android: 40,
      }),
    },
  },
  /**
  |--------------------------------------------------
  | Impressum Component
  |--------------------------------------------------
  */
  Impressum: {
    Header: {
      fontWeight: "bold",
      color: "white",
      fontSize: 20,
      marginLeft: Dimensions.get("screen").width / 2 - 150,
    },
    HeaderView: {
      top: StatusBar.currentHeight,
      width: Dimensions.get("screen").width - 100,
      height: 50,
      justifyContent: "center",
    },
    BackButtonView: {
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "center",
    },
    Header2: {
      top: StatusBar.currentHeight,
      fontWeight: "bold",
      color: "white",
      fontSize: 17,
      padding: 15,
    },
    Background: {
      flex: 1,
      position: "absolute",
    },
    Text: {
      top: StatusBar.currentHeight,
      color: "white",
      fontSize: 15,
      padding: 20,
      paddingTop: 0,
    },
    Button: {
      height: 50,
      width: 80,
      borderColor: "#273f59",
    },
    ButtonContainer: {
      alignSelf: "center",
      paddingTop: StatusBar.currentHeight,
    },
  },
};
export default styles;
