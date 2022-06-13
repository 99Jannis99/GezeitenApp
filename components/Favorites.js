import { StatusBar } from "expo-status-bar";
import {
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import { withTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import { ListItem, Input } from "react-native-elements";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import DeIcon from "../assets/svg/deIcon";
import NlIcon from "../assets/svg/nlIcon";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Locations from "./Locations";

class Favorites extends Component {
  state = {
    LocationsWithChosed: [],
    LocationsWithChosedOriginal: [],
    addFavorites: false,
    Background: "high",
  };

  constructor(props) {
    super(props);
  }

  // wenn das Component gemountet wurde werden direkt die Daten von der API geladen mit fetchData() und im state locationData für die Ausgabe auf dem Display und originalLocationData gespeichert

  componentDidMount() {
    let { navigation } = this.props;
    navigation.addListener("blur", () => {
      this.setState({ addFavorites: false });
    });
    navigation.addListener("focus", () => {
      this.getData();
    });
    this.getData();
  }
  sortOutLocations(text) {
    // wenn text mitgegeben wird, werden beim ändern des Suchzeileninputs...
    if (text) {
      // ... die OrtsDaten gefiltert,...
      let newLocationData = _.filter(
        this.state.LocationsWithChosedOriginal,
        (o) => {
          // ...jenachdem ob mit IndexOf etwas über -1 ausgegeben wird (also ob mindestens 1 Buchstabe des eingebenen Textes in dem Ortsnamen vorhanden ist)
          return o.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        }
      );
      this.setState({ LocationsWithChosed: newLocationData });
    } else {
      this.setState({
        LocationsWithChosed: this.state.LocationsWithChosedOriginal,
      });
    }
  }

  clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.log("ClearAsyncError: ", err);
    }

    console.log("Done.");
  };

  getData = async () => {
    AsyncStorage.multiGet(
      ["Background", "LocationsWithChosed"],
      (err, stores) => {
        // console.log(stores[1][1]);

        this.setState({
          Background: stores[0][1],
          LocationsWithChosed: JSON.parse(stores[1][1]),
          LocationsWithChosedOriginal: JSON.parse(stores[1][1]),
        });
      }
    );
  };
  createFavorites(d) {
    const { t } = this.props;
    // ein Toast wir bei drücken getriggert
    Toast.show({
      type: d.chosed ? "success" : "error",
      text1: d.chosed
        ? d.name + " " + t("ToastAddFavorite")
        : d.name + " " + t("ToastRemoveFavorite"),
      visibilityTime: 1500,
      position: "bottom",
    });
    this.saveData(this.state.LocationsWithChosed);
  }
  saveData = async (value) => {
    // OrtsDaten werden zum String convertiert
    let object = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("LocationsWithChosed", object);
    } catch (err) {
      console.log("Error onSubmit :" + err);
    }
  };
  render() {
    const { t } = this.props;

    const filtertLocations = _.filter(this.state.LocationsWithChosed, {
      chosed: true,
    });
    switch (this.state.addFavorites) {
      case true:
        return (
          <ImageBackground
            source={require("../assets/pictures/default_background-dashboard.jpg")}
            resizeMode="cover"
            style={{
              flex: 1,
            }}
          >
            <Locations />
            <StatusBar style="auto" />
            <Toast position="bottom" />
          </ImageBackground>
        );
        break;
      case false:
        return (
          <ImageBackground
            source={require("../assets/pictures/securityhint_background.jpg")}
            resizeMode="cover"
            style={{
              flex: 1,
            }}
          >
            <Input
              onChangeText={(text) => this.sortOutLocations(text)}
              containerStyle={myStyle.LocationsInputContainer}
              inputContainerStyle={myStyle.LocationsInputInputContainer}
              leftIcon={
                <IconFontAwesome
                  name="search"
                  size={25}
                  color="#3f444d"
                  onLongPress={this.clearAsyncStorage.bind(this)}
                />
              }
              rightIcon={
                <IconEntypo
                  name={"plus"}
                  size={25}
                  color="#3f444d"
                  onPress={() => this.setState({ addFavorites: true })}
                />
              }
              placeholder={t("LocationsPlaceholder")}
              placeholderTextColor="#3f444d"
            ></Input>
            {filtertLocations.length < 1 ? (
              <Image
                style={{
                  width: 292,
                  height: 116,
                  alignSelf: "flex-end",
                  marginRight: 20,
                }}
                source={require("../assets/pictures/addFavorites_de.png")}
              />
            ) : null}
            <ScrollView style={myStyle.LocationsScrollView}>
              {filtertLocations.map((d, i) => {
                return (
                  <ListItem
                    leftWidth={30}
                    key={i}
                    leftStyle={{ width: 50 }}
                    containerStyle={{
                      backgroundColor: "rgba(143, 247, 168," + "0)",
                    }}
                    titleStyle={{
                      textAlign: "center",
                    }}
                  >
                    <ListItem.Content>
                      <View style={{ flexDirection: "row" }}>
                        {d.country === "Deutschland" ? <DeIcon /> : <NlIcon />}
                        <View
                          style={{
                            width: Dimensions.get("screen").width - 80,
                          }}
                        >
                          <ListItem.Title
                            style={{
                              alignSelf: "center",
                              color: "white",
                            }}
                          >
                            {d.displayName}
                          </ListItem.Title>
                        </View>
                        <IconEntypo
                          name={"trash"}
                          size={25}
                          color={"#f5767a"}
                          onPress={() => {
                            d.chosed = !d.chosed;
                            this.createFavorites(d);
                            this.forceUpdate();
                          }}
                        />
                      </View>
                    </ListItem.Content>
                  </ListItem>
                );
              })}
            </ScrollView>
          </ImageBackground>
        );

        break;
      default:
        break;
    }
  }
}
export default withTranslation()(Favorites);
