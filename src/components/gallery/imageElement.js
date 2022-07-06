import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

class ImageElement extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Image
        source={{ uri: this.props.imagsource.fileUrl }}
        style={styles.image}
      />
    );
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
