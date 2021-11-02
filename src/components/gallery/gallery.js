import React, { Component } from "react";
import { View, Text, Image, FlatList } from "react-native";
import ActionButton from "react-native-action-button";
import commonStyles from "../../shared/commonStyles";
import Post from "./post";

export default class Gallery extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Post image={require("../../assets/casa.png")} />       
      </View>
    );
  }
}
