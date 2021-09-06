import React, { Component } from "react";
import { View, Text, ActivityIndicator, Modal } from "react-native";

class LocationFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size={"large"}
          color={"#db382f"}
          animating={this.state.loading}
          style={{ flex: 1 }}
        />
      );
    } else {
      return (
        <Modal visible={this.props.visible}>
          <Text>Modal</Text>
        </Modal>
      );
    }
  }
}

export default LocationFilterModal;
