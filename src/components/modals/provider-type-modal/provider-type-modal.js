import React, { Component } from "react";
import { View, Modal, StyleSheet } from "react-native";

class ProviderTypeModal extends Component {
  render() {
    return (
      <Modal
        style={style.modal}
        visible={this.props.visible}
        animationType={"fade"}
        transparent={false}
        onShow={() => this._loadData()}
        onRequestClose={() => this.props.close()}
      ></Modal>
    );
  }
}

const style = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: 40,
  },
  container: {
    flex: 1,
    marginHorizontal: "10%",
    marginVertical: "20%",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    elevation: 10,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    elevation: 10,
  },
});

export default ProviderTypeModal;
