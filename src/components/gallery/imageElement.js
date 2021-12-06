import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";

class ImageElement extends Component {
  render() {
    return <Image source={this.props.imagsource} style={styles.image} />;
  }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
     width: null,
    alignSelf: "stretch",   
  },
});

export default ImageElement;
