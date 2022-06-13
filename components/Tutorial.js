import { StatusBar } from "expo-status-bar";
import {  Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import myStyle from "../assets/styles";
import { useTranslation } from "react-i18next";


const Tutorial = (props) => {
  // constante für übersetzung / wird so benutzt: {t("Keyword")}

  const { t, i18n } = useTranslation();
  return (
    <View style={myStyle.HinweisView}>
      <StatusBar style="auto" />
      <Text style={[{ fontSize: 35, marginTop: 40 }, myStyle.HinweisText]}>
        {t("headlineTurorial")}
      </Text>
      <Text style={[{ marginTop: 40, fontSize: 15 }, myStyle.HinweisText]}>
        {t("description")}
      </Text>
      <Image
        source={require("../assets/pictures/downGif.gif")}
        style={myStyle.TutorialIcon}
      />
      <Text
        style={[
          { marginLeft: 20, marginRight: 20, fontSize: 15, marginTop: 30 },
          myStyle.HinweisText,
        ]}
      >
        {t("descriptionDown")}
      </Text>
      <Image
        source={require("../assets/pictures/upGif.gif")}
        style={myStyle.TutorialIcon}
      />
      <Text
        style={[
          { marginLeft: 20, marginRight: 20, fontSize: 15, marginTop: 30 },
          myStyle.HinweisText,
        ]}
      >
        {t("descriptionUp")}
      </Text>
      <TouchableOpacity
        onPress={props.goAhead}
        style={myStyle.TutorialAgreeButton}
      >
        <Text style={[{ fontSize: 17 }, myStyle.HinweisText]}>
          {t("TutorialAgreeButton")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tutorial;
