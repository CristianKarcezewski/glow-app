import React, { Component } from "react";
import { View, Image, FlatList } from "react-native";
import ActionButton from "react-native-action-button";
import commonStyles from "../../../shared/commonStyles";

export default class Gallery extends Component {
  render() {
    return (
      <View style={{ flex: 1, padding: 5 }}>
        <View style={{ flex: 1, padding: 5 }}>
          <Image
            style={{ flex: 1, width: "100%", height: "90%" }}
            source={require("../../../assets/casa.png")}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, padding: 5 }}>
            <Image
              style={{ flex: 1, width: "100%", height: "60%" }}
              source={require("../../../assets/cozinha.jpg")}
            />
          </View>
          <View style={{ flex: 1, padding: 5 }}>
            <Image
              style={{ flex: 1, width: "100%", height: "60%", padding: 10 }}
              source={require("../../../assets/Piso.jpg")}
            />
          </View>
        </View>

        <ActionButton
          style={{ flex: 3 }}
          buttonColor={commonStyles.colors.today}
          onPress={() => {
            this.setState({ showAddTask: true });
          }}
        />
      </View>
    );
  }
}
