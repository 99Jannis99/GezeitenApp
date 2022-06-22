import React, { Component } from "react";
import { Text, View, Image, SafeAreaView, Alert, Linking } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import myStyle from "../assets/styles";
import i18n from "i18next";
import DeIcon from "../assets/svg/deIcon";
import EnIcon from "../assets/svg/enIcon";
import { Translation, withTranslation } from "react-i18next";
import Info from "react-native-vector-icons/Feather";

export class Settings extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    languageIndex: null,
    locationViewIndex: null,
    freeApp: true,
  };
  componentDidMount() {
    let { navigation } = this.props;
    navigation.addListener("focus", () => {
      this.getData();
    });
    this.getData();
  }

  getData = async () => {
    try {
      let asyncData = await AsyncStorage.multiGet([
        "language",
        "locationView",
        "locationViewIndex",
      ]);
      if (asyncData !== null) {
        this.setState({
          languageIndex: asyncData[0][1] == "en" ? 0 : 1,
          LocationViewIndex: asyncData[2][1] ? parseInt(asyncData[2][1]) : 0,
        });
      }
    } catch (err) {
      console.log("Error get Data :" + err);
    }
  };

  saveData = async (Item, pressedindex) => {
    const { t } = this.props;
    let _language;
    let _locationView = [];
    if (Item == "language") {
      _language = pressedindex == 0 ? "en" : "de";
      i18n.changeLanguage(_language);
      this.setState({ languageIndex: pressedindex });
    } else {
      if (this.state.freeApp) {
        _locationView = "1,2,3";
        Alert.alert(
          t("upgradeHeader"),
          t("proText"),
          [
            {
              text: t("buttonPro"),
              onPress: async () =>
                await Linking.openURL("https://play.google.com/store/apps/details?id=com.dimento.nordsee.gezeiten&gl=DE"),
              style: "default",
            },
            {
              text: "",
              style: "cancel",
            },
            {
              text: t("buttonProLater"),
              style: "cancel",
            },
          ],
          {
            cancelable: false,
          }
        );
        this.setState({ LocationViewIndex: 0 });
      } else {
        switch (pressedindex) {
          case 0:
            _locationView = "1,2,3";
            break;
          case 1:
            _locationView = "1,2,3,4,5";
            break;
          case 2:
            _locationView = "1,2,3,4,5,6,7";
            break;
          default:
            break;
        }
        this.setState({ LocationViewIndex: pressedindex });
      }
    }

    if (Item == "language") {
      try {
        await AsyncStorage.setItem("language", _language);
      } catch (err) {
        console.log("Error onSubmit :" + err);
      }
    } else {
      try {
        await AsyncStorage.multiSet([
          ["locationView", _locationView],
          this.state.freeApp
            ? ["locationViewIndex", "0"]
            : ["locationViewIndex", pressedindex.toString()],
        ]);
      } catch (err) {
        console.log("Error onSubmit :" + err);
      }
    }
  };

  render() {
    const { route } = this.props;
    const Button1 = () => (
      <View style={myStyle.Settings.ButtonGroupButtonView}>
        <EnIcon />
        <Text style={myStyle.Settings.ButtonGroupButtonText}>English</Text>
      </View>
    );
    const Button2 = () => (
      <View style={myStyle.Settings.ButtonGroupButtonView}>
        <DeIcon />
        <Text style={myStyle.Settings.ButtonGroupButtonText}>Deutsch</Text>
      </View>
    );
    return (
      <Translation>
        {(t) => (
          <SafeAreaView>
            <Image
              style={{
                flex: 1,
                position: "absolute",
              }}
              source={require("../assets/pictures/default_background-dashboard.jpg")}
            />
            <Text style={myStyle.Settings.Header}>{t("language")}</Text>
            <Info
              style={myStyle.Settings.InfoIcon}
              name="info"
              size={25}
              color="#273f59"
              onPress={() => route.params.showImpressum()}
            />
            <ButtonGroup
              onPress={(pressedindex) =>
                this.saveData("language", pressedindex)
              }
              selectedIndex={this.state.languageIndex}
              buttons={[{ element: Button1 }, { element: Button2 }]}
              containerStyle={myStyle.Settings.ButtonGroupContainer}
              buttonStyle={myStyle.Settings.ButtonGroupButton}
              buttonContainerStyle={myStyle.Settings.ButtonGroupButtonContainer}
              selectedButtonStyle={myStyle.Settings.ButtonGroupButtonSelected}
            />
            <Text style={myStyle.Settings.Header}>{t("locationView")}</Text>
            <ButtonGroup
              onPress={(pressedindex) =>
                this.saveData("locationView", pressedindex)
              }
              selectedIndex={this.state.LocationViewIndex}
              buttons={[t("3Days"), t("5Days"), t("7Days")]}
              containerStyle={myStyle.Settings.ButtonGroupContainerLocationView}
              buttonStyle={myStyle.Settings.ButtonGroupButton}
              buttonContainerStyle={myStyle.Settings.ButtonGroupButtonContainer}
              selectedButtonStyle={myStyle.Settings.ButtonGroupButtonSelected}
              textStyle={myStyle.Settings.ButtonGroupButtonText}
              selectedTextStyle={myStyle.Settings.ButtonGroupButtonText}
            />
          </SafeAreaView>
        )}
      </Translation>
    );
  }
}

export default withTranslation()(Settings);
