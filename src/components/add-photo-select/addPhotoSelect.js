import React, { Component } from "react";
import {
  Plataform,
  Modal,
  View,
  Text,
  TextInput,
  // DatePickerIOS,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import commonStyles from "../../shared/commonStyles";


export default class AddPhoto extends Component {
  constructor(props) {
    super(props);   
  }

  render() {
    return (
      // <Modal
      //   onRequestClose={this.props.onCancel}
      //   visible={this.props.isVisible}
      //   animationType="slide"
      //   transparent={true}
      // >

      // </Modal>
      <View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Adicionar Foto!</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("add-photo-camera")}
            >
              <Text style={styles.button}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("add-photo-gallery")
              }
            >
              <Text style={styles.button}>Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("provider-gallery-stack")
              }
            >
              <Text style={styles.button}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  background: {
    flex: 2,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    marginRight: 30,
    fontSize: 18,
    color: commonStyles.colors.today,
  },
  header: {
    //fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  
});
