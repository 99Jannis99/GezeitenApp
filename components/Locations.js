import { StatusBar } from "expo-status-bar";
import { View, ImageBackground, Dimensions, ScrollView } from "react-native";
import React, { Component } from "react";
import myStyle from "../assets/styles";
import { withTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchData from "../functions/fetchData";
import _ from "lodash";
import { ListItem, Input } from "react-native-elements";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import DeIcon from "../assets/svg/deIcon";
import NlIcon from "../assets/svg/nlIcon";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { Toast } from "react-native-toast-message/lib/src/Toast";

class Locations extends Component {
  state = {
    originalLocationData: [],
    fetchLocationData: [],
    locationData: [],
    byLocationSortData: [],
    rightIcon: "location",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /**
  |--------------------------------------------------
  | die OrtsDaten wern geholt
  |--------------------------------------------------
  */
    this.getData();
  }

  /**
  |--------------------------------------------------
  | diese Funktion sortiert die OrtsDaten nach dem eingegebenen Text in der Suchzeile:
  |--------------------------------------------------
  */
  sortOutLocations(text) {
    /**
    |--------------------------------------------------
    | wenn text mitgegeben wird, werden beim ändern des Suchzeileninputs...
    |--------------------------------------------------
    */
    if (text) {
      /**
      |--------------------------------------------------
      | ... die OrtsDaten gefiltert,...
      |--------------------------------------------------
      */
      let newLocationData = _.filter(
        this.state.rightIcon === "location"
          ? /**
          |--------------------------------------------------
          | hier wird entweder die sortierte Liste nach Distanz zum nutzer oder nach Alphabet benutzt
          |--------------------------------------------------
          */
            this.state.originalLocationData
          : this.state.byLocationSortData,
        (o) => {
          /**
          |--------------------------------------------------
          | ...jenachdem ob mit IndexOf etwas über -1 ausgegeben wird (also ob mindestens 1 Buchstabe des eingebenen Textes in dem Ortsnamen vorhanden ist)
          |--------------------------------------------------
          */
          return o.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        }
      );
      this.setState({ locationData: newLocationData });
    } else {
      /**
      |--------------------------------------------------
      | wenn beim ändern kein Text mitgegeben wird (also der Text wieder rausgelöscht wird aus der Suchzeile)
      |--------------------------------------------------
      */
      this.state.rightIcon === "location"
        ? /**
        |--------------------------------------------------
        | wird die Liste wieder auf die sortierten OrtsDaten nach Alphabet...
        |--------------------------------------------------
        */
          this.setState({ locationData: this.state.originalLocationData })
        : /**
        |--------------------------------------------------
        | oder nach Entfernung zum Nutzer gesetzt
        |--------------------------------------------------
        */
          this.setState({ locationData: this.state.byLocationSortData });
    }
  }

  /**
  |--------------------------------------------------
  | diese Funktion sortiert die OrtsDaten nach Entfernung zum Nutzer
  |--------------------------------------------------
  */

  sortOutLocationsByLocation() {
    /**
    |--------------------------------------------------
    | wenn der Nutzer das "location" Icon drückt...
    |--------------------------------------------------
    */
    if (this.state.rightIcon === "location") {
      const { t } = this.props;
      /**
      |--------------------------------------------------
      | fügt den Toast (Mitteilung unten) ein mit der Benachichtigung das die Loction geladen werden
      |--------------------------------------------------
      */
      Toast.show({
        type: "info",
        text1: t("ToastHeader"),
        text2: t("ToastText"),
        visibilityTime: 1500,
      });
      (async () => {
        /**
        |--------------------------------------------------
        | wird nach Berechtigung zum Zugriff auf den Standort gefragt
        |--------------------------------------------------
        */
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        /**
        |--------------------------------------------------
        | wir die Berechtigung gegeben wird die aktuelle Position des Nutzers gelesen
        |--------------------------------------------------
        */
        let location = await Location.getCurrentPositionAsync({});
        /**
        |--------------------------------------------------
        | dann werden die OrtsDaten nach Entfernung zum Nutzer sortiert
        |--------------------------------------------------
        */
        let locationSortItems = _.sortBy(this.state.originalLocationData, [
          (o) => {
            return getDistance(location.coords, o.coords);
          },
        ]);
        /**
        |--------------------------------------------------
        | füge den sortierten OrtsDaten noch die Distanz zum Nutzer hinzu
        |--------------------------------------------------
        */
        locationSortItems = locationSortItems.map((d, i) => {
          d.distance = getDistance(location.coords, d.coords);
          return d;
        });
        /**
        |--------------------------------------------------
        | Im state locationData für die Ausgabe auf dem Display, und im state byLocationSortData für spätere Verwendung in anderen Funktionen gespeichert
        |--------------------------------------------------
        */
        this.setState({
          locationData: locationSortItems,
          rightIcon: "language",
          byLocationSortData: locationSortItems,
        });
      })();
    } else {
      /**
      |--------------------------------------------------
      | wenn der Nutzer aber das Aplhabet Icon drückt werden die OrtsDaten wieder nach Alphabet sortiert
      |--------------------------------------------------
      */
      let alphabetSortItems = _.sortBy(this.state.originalLocationData, [
        (o) => {
          return o.name;
        },
      ]);
      this.setState({
        /**
        |--------------------------------------------------
        | Im state locationData gespeichert für die Ausgabe auf dem Display
        |--------------------------------------------------
        */
        locationData: alphabetSortItems,
        rightIcon: "location",
      });
    }
  }
  /**
|--------------------------------------------------
| wird ausgeführt wenn auf das Plus oder die Mülltonne gedrückt wird
|--------------------------------------------------
*/
  createFavorites(d) {
    const { t } = this.props;
    /**
    |--------------------------------------------------
    | ein Toast wir bei drücken getriggert
    |--------------------------------------------------
    */
    Toast.show({
      type: d.chosed ? "success" : "error",
      text1: d.chosed
        ? d.name + " " + t("ToastAddFavorite")
        : d.name + " " + t("ToastRemoveFavorite"),
      visibilityTime: 1500,
      position: "bottom",
    });
    /**
    |--------------------------------------------------
    | jenachdem ob wir die Liste nach Location oder Alphabet sortiert haben wir aus originalLocationData oder byLocationSortData ausgewählt
    |--------------------------------------------------
    */
    this.state.rightIcon === "location"
      ? /**
      |--------------------------------------------------
      | die OrtsDaten werden im AsyncStorage gespeichert
      |--------------------------------------------------
      */
        this.saveData(this.state.originalLocationData)
      : this.saveData(this.state.byLocationSortData);
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
    try {
      let asyncLocationsWithChosed = await AsyncStorage.getItem(
        "LocationsWithChosed"
      );
      /**
      |--------------------------------------------------
      | wenn die OrtsDaten gespeichert wurden im Asyncstorage werden diese zur Ausgabe auf dem Display genutzt
      |--------------------------------------------------
      */
      if (asyncLocationsWithChosed !== null) {
        asyncLocationsWithChosed = JSON.parse(asyncLocationsWithChosed);
        this.setState({
          locationData: asyncLocationsWithChosed,
          originalLocationData: asyncLocationsWithChosed,
        });
      } else {
        /**
      |--------------------------------------------------
      | wenn nicht werden die OrtsDaten con der Api neu geladen
      |--------------------------------------------------
      */
        fetchData("locations", {})
          .then((data) => {
            /**
            |--------------------------------------------------
            | die OrtsDaten der Api werden nach Alphabet sortiert
            |--------------------------------------------------
            */
            let alphabetSortItems = _.sortBy(data.success.items, [
              (o) => {
                return o.name;
              },
            ]);
            /**
            |--------------------------------------------------
            | den OrtsDaten der Api wird jedem object "chosed : false" hinzugefügt
            |--------------------------------------------------
            */
            alphabetSortItems = alphabetSortItems.map((d, i) => {
              d.chosed = false;
              return d;
            });
            /**
            |--------------------------------------------------
            | die OrtsDaten die auf dem Display ausgegeben werden werden gesetzt
            |--------------------------------------------------
            */
            this.setState({
              locationData: alphabetSortItems,
              originalLocationData: alphabetSortItems,
            });
          })
          /**
          |--------------------------------------------------
          | wenn die OrtsDaten nicht von der Api geladen werden können wir ein Error ausgegeben als Toast
          |--------------------------------------------------
          */
          .catch((err) => {
            const { t } = this.props;
            Toast.show({
              type: "error",
              text1: t("ToastHeaderErrorFetch"),
              text2: t("ToastTextErrorFetch"),
              visibilityTime: 60000,
              position: "top",
            });
          });
      }
    } catch (err) {
      console.log("Error get Data :" + err);
    }
  };
  /**
  |--------------------------------------------------
  | OrtsDaten werden gespeichert
  |--------------------------------------------------
  */
  saveData = async (value) => {
    /**
    |--------------------------------------------------
    | OrtsDaten werden zum String convertiert
    |--------------------------------------------------
    */
    let object = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("LocationsWithChosed", object);
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
        style={myStyle.Locations.View}
      >
        <Input
          onChangeText={(text) => this.sortOutLocations(text)}
          containerStyle={myStyle.Locations.InputContainer}
          inputContainerStyle={myStyle.Locations.InputInputContainer}
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
              name={this.state.rightIcon}
              size={25}
              color="#3f444d"
              onPress={this.sortOutLocationsByLocation.bind(this)}
            />
          }
          placeholder={t("LocationsPlaceholder")}
          placeholderTextColor="#3f444d"
        ></Input>

        <ScrollView scrollEnabled={true} style={myStyle.Locations.ScrollView}>
          {this.state.locationData.map((d, i) => {
            return (
              <ListItem
                leftWidth={30}
                key={i}
                leftStyle={{ width: 50 }}
                containerStyle={{
                  backgroundColor: d.chosed
                    ? "rgba(143, 247, 168," + "0.15)"
                    : "rgba(143, 247, 168," + "0)",
                }}
                titleStyle={{
                  textAlign: "center",
                }}
              >
                <ListItem.Content>
                  <View style={myStyle.Locations.ListView}>
                    {d.country === "Deutschland" ? <DeIcon /> : <NlIcon />}
                    <View
                      style={myStyle.Locations.ChildView}
                    >
                      <ListItem.Title
                        style={myStyle.Locations.ListItemTitel}
                      >
                        {this.state.rightIcon === "location"
                          ? d.displayName
                          : d.displayName +
                            " (" +
                            Math.round(d.distance / 1000) +
                            " km" +
                            ")"}
                      </ListItem.Title>
                    </View>
                    <IconEntypo
                      name={d.chosed ? "trash" : "plus"}
                      size={25}
                      color={d.chosed ? "#f5767a" : "#8ff7a8"}
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
        <StatusBar style="auto" />
        <Toast position="bottom" />
      </ImageBackground>
    );
  }
}
export default withTranslation()(Locations);
