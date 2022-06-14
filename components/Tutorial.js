import { StatusBar } from "expo-status-bar";
import { Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import React from "react";
import myStyle from "../assets/styles";
import { useTranslation } from "react-i18next";

const Tutorial = (props) => {
  /**
  |--------------------------------------------------
  | Konstante für übersetzung / wird so benutzt: {t("Keyword")}
  |--------------------------------------------------
  */
  const { t } = useTranslation();
  return (
    <ImageBackground
      source={require("../assets/pictures/default_background-dashboard.jpg")}
      resizeMode="cover"
      style={myStyle.Tutorial.View}
    >
      <StatusBar style="auto" />
      <Text style={myStyle.Tutorial.Headline}>{t("headlineTurorial")}</Text>
      <Text style={myStyle.Tutorial.Description}>{t("description")}</Text>
      <Image
        source={require("../assets/pictures/downGif.gif")}
        style={myStyle.Tutorial.Icon}
      />
      <Text style={myStyle.Tutorial.DescriptionDown}>
        {t("descriptionDown")}
      </Text>
      <Image
        source={require("../assets/pictures/upGif.gif")}
        style={myStyle.Tutorial.Icon}
      />
      <Text style={myStyle.Tutorial.DescriptionDown}>{t("descriptionUp")}</Text>
      <TouchableOpacity
        onPress={props.goAhead}
        style={myStyle.Tutorial.AgreeButton}
      >
        <Text style={myStyle.Tutorial.AgreeButtonText}>
          {t("TutorialAgreeButton")}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Tutorial;
