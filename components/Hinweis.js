import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import DeIcon from "../assets/svg/deIcon";
import EnIcon from "../assets/svg/enIcon";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Hinweis extends Component {
  state = {};
  constructor(props) {
    super(props);
  }

  saveData = async (value) => {
    i18n.changeLanguage(value);
    try {
      await AsyncStorage.setItem("language", value);
    } catch (err) {
      console.log("Error onSubmit :" + err);
    }
  };

  render() {
    const { t } = this.props;
    return (
      <ImageBackground
        source={require("../assets/pictures/default_background-dashboard.jpg")}
        resizeMode="cover"
        style={myStyle.Hinweis.View}
      >
        <StatusBar style="auto" />

        {/*
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        |  {t} für Text in beiden Sprachen
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        */}

        <Text style={myStyle.Hinweis.HeadlineText}>{t("headline")}</Text>
        <Text style={myStyle.Hinweis.SecondHeadlineText}>
          {t("secondHeadline")}
        </Text>
        <View style={myStyle.Hinweis.InfoView}>
          <Text style={myStyle.Hinweis.InfoText}>{t("info")}</Text>
        </View>
        <Text style={myStyle.Hinweis.LanguageChoice}>
          {t("languageChoice")}
        </Text>

        {/**
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        |  Buttons um die Sprache zu ändern
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        */}

        <TouchableOpacity
          style={myStyle.Hinweis.TouchableOpacity}
          onPress={() => this.saveData("de")}
        >
          <DeIcon />
          <View style={myStyle.Hinweis.IconSpaceView}></View>
          <Text style={myStyle.Hinweis.SpracheText}>Deutsch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={myStyle.Hinweis.TouchableOpacity}
          onPress={() => this.saveData("en")}
        >
          <EnIcon />
          <View style={myStyle.Hinweis.IconSpaceView}></View>
          <Text style={myStyle.Hinweis.SpracheText}>English</Text>
        </TouchableOpacity>

        {/**
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        | Buttons zum Bestätigen oder Ablehenn
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        */}

        <TouchableOpacity
          onPress={this.props.startTutorial}
          style={myStyle.Hinweis.ButtonBottomLeft}
        >
          <Text style={myStyle.Hinweis.SpracheText}>{t("buttonAgree")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              t("declineTitel"),
              t("declineMessage"),
              [
                {
                  text: t("buttonAgree"),
                  onPress: () => this.props.startTutorial(),
                  style: "destructive",
                },
              ],
              {
                cancelable: true,
              }
            );
          }}
          style={myStyle.Hinweis.ButtonBottomRight}
        >
          <Text style={myStyle.Hinweis.SpracheText}>{t("buttonDecline")}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default withTranslation()(Hinweis);
