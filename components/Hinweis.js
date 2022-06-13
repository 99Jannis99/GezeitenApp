import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Alert } from "react-native";
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
  // getData = async () => {
  //   try {
  //     const asyncLanguage = await AsyncStorage.getItem("language");
  //     if (asyncLanguage !== null) {
  //       i18n.changeLanguage(asyncLanguage);
  //     }
  //   } catch (err) {
  //     console.log("Error get Data :" + err);
  //   }
  // };
  render() {
    const { t } = this.props;
    return (
      <View style={myStyle.HinweisView}>
        <StatusBar style="auto" />

        {/*
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        |  {t} für Text in beiden Sprachen
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        */}

        <Text style={[{ fontSize: 35, top: 40 }, myStyle.HinweisText]}>
          {t("headline")}
        </Text>
        <Text style={[{ fontSize: 25, marginTop: 60 }, myStyle.HinweisText]}>
          {t("secondHeadline")}
        </Text>
        <View style={myStyle.HinweisInfoText}>
          <Text
            style={[
              { marginLeft: 20, marginRight: 20, fontSize: 15, marginTop: 30 },
              myStyle.HinweisText,
            ]}
          >
            {t("info")}
          </Text>
        </View>
        <Text
          style={[
            { fontSize: 21, marginTop: 55, marginBottom: 10 },
            myStyle.HinweisText,
          ]}
        >
          {t("languageChoice")}
        </Text>

        {/**
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        |  Buttons um die Sprache zu ändern
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        */}

        <TouchableOpacity
          style={myStyle.HinweisTouchableOpacity}
          onPress={() => this.saveData("de")}
        >
          <DeIcon />
          <View style={myStyle.HinweisIconSpaceView}></View>
          <Text style={myStyle.HinweisSpracheText}>Deutsch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={myStyle.HinweisTouchableOpacity}
          onPress={() => this.saveData("en")}
        >
          <EnIcon />
          <View style={myStyle.HinweisIconSpaceView}></View>
          <Text style={myStyle.HinweisSpracheText}>English</Text>
        </TouchableOpacity>

        {/**
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        | Buttons zum Bestätigen oder Ablehenn
        |------------------------------------------------------------------------------------------------------------------------------------------------------
        */}

        <TouchableOpacity
          onPress={this.props.startTutorial}
          style={[{ backgroundColor: "#BBDEFB" }, myStyle.HinweisButtonBottom]}
        >
          <Text style={myStyle.HinweisSpracheText}>{t("buttonAgree")}</Text>
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
          style={[
            { right: 0, backgroundColor: "#1976D2" },
            myStyle.HinweisButtonBottom,
          ]}
        >
          <Text style={myStyle.HinweisSpracheText}>{t("buttonDecline")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withTranslation()(Hinweis);
