import React, { Component } from "react";
import { Text, View,SafeAreaView, Image } from "react-native";
import { Button } from "@rneui/base";
import { Translation } from "react-i18next";
import myStyle from "../assets/styles";
import Back from "react-native-vector-icons/AntDesign";

export class Impressum extends Component {
  render() {
    return (
      <Translation>
        {(t) => (
          <SafeAreaView>
            <Image
              style={myStyle.Impressum.Background}
              source={require("../assets/pictures/default_background-dashboard.jpg")}
            />
            <Text style={myStyle.Impressum.Header}> {t("about")} </Text>
            <Text style={myStyle.Impressum.Header2}> {t("programming")} </Text>
            <Text style={myStyle.Impressum.Text}>
              dimento.com gmbh{"\n"}Internet Kommunikation{"\n"}
              {"\n"}Hammer Str. 89{"\n"}48153 Münster - Deutschland{"\n"}
              {"\n"}Tel.: +49 251 322 65 44 - 0{"\n"}Fax: +49 251 322 65 44 - 99
              {"\n"}
              {"\n"}dimento.com{"\n"}info@dimento.com
            </Text>
            <Text style={myStyle.Impressum.Header2}> {t("design")} </Text>
            <Text style={myStyle.Impressum.Text}>
              george design{"\n"}
              {"\n"}Lippstädter Str. 46{"\n"}48155 Münster - Deutschland{"\n"}
              {"\n"}Tel.: +49 251 239 37 - 0{"\n"}Fax: +49 251 239 37 - 19{"\n"}
              {"\n"}
              {t("managingDirector")}
              {"\n"}Thomas Georg{"\n"}Dipl. Grafik Designer AGD{"\n"}
              {"\n"}www.georg-design.de{"\n"}mail@georg-design.de
            </Text>
            <Button
              containerStyle={myStyle.Impressum.ButtonContainer}
              buttonStyle={myStyle.Impressum.Button}
              title={t("impressumBackButton")}
              type="outline"
              onPress={() => this.props.hideImpressum("hide")}
            >
              <Back name="back" size={25} color="#273f59"></Back>
            </Button>
          </SafeAreaView>
        )}
      </Translation>
    );
  }
}

export default Impressum;
