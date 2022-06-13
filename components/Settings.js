import React, { Component } from "react";
import { Text, View, Image } from "react-native";

export class Settings extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View>
        <Image
          style={{
            flex: 1,
            position: "absolute",
          }}
          source={require("../assets/pictures/default_background-dashboard.jpg")}
        />
      </View>
    );
  }
}

export default Settings;
