import React, { Component } from "react";
import { Modal, StyleSheet } from "react-native";
import ManualAddress from "../../addresses/manual-address";

class AddressModal extends Component {
  render() {
    return (
      <Modal
        style={style.modal}
        visible={this.props.visible}
        animationType={"fade"}
        transparent={false}
        onRequestClose={() => this.props.close()}
      >
        <ManualAddress
          emitters={this.props.emitters}
          close={this.props.close}
        ></ManualAddress>
      </Modal>
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

export default AddressModal;
