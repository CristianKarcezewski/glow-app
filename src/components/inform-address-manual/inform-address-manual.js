import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

class InformAddressManual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: null,
      selectedCity: null,
    };
  }

  _register() {
    this.props.emitters.loginEmitter.login("Bearer dsgpsogspog");
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <View style={styles.cardPrimaryConteiner}>
        <Text style={styles.cardTitleTextBox}>Cadastre um endereço:</Text>
        <View style={styles.cardDescriptionConteiner}>
          <TextInput
            style={styles.cardSelectTextBox}
            type="name"
            placeholder="Informe um nome para o endereço"
          />
          <TextInput
            style={styles.cardSelectTextBox}
            type="cep"
            placeholder="Informe o cep"
          />
          <View style={styles.pickerView}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.selectedState}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ ...this.state, selectedState: itemIndex })
              }
            >
              <Picker.Item
                label={"Selecione seu estado"}
                value={null}
                key={""}
              />
              {this.props.emitters.locationsEmitter
                .getAllStates()
                .map((st, index) => {
                  return (
                    <Picker.Item label={st.name} value={st.uf} key={index} />
                  );
                })}
            </Picker>
          </View>
          <View style={styles.pickerView}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.selectedCity}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ ...this.state, selectedCity: itemIndex })
              }
            >
              <Picker.Item
                label={"Selecione sua cidade"}
                value={null}
                key={""}
              />
              {this.props.emitters.locationsEmitter
                .getStateByIndex(this.state.selectedState)
                ?.cities.map((city, index) => {
                  return <Picker.Item label={city} value={city} key={index} />;
                })}
            </Picker>
          </View>
          <TextInput
            style={styles.cardSelectTextBox}
            type="cidade"
            placeholder="Informe a cidade"
          />
          <TextInput
            style={styles.cardSelectTextBox}
            type="logradouro"
            placeholder="Informe o logradouro"
          />
          <TextInput
            style={styles.cardSelectTextBox}
            type="numero"
            placeholder="Informe o número"
          />
          <TextInput
            style={styles.cardSelectTextBox}
            type="complemento"
            placeholder="Informe o complemento"
          />
        </View>
        <View style={styles.cardBottunConteiner}>
          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => this.props.navigation.navigate("address-list")}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
              Salvar
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardPrimaryConteiner: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  cardDescriptionConteiner: {
    flex: 7,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  cardBottunConteiner: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  cardSelectTextBox: {
    paddingLeft: 20,
    paddingRight: 5,
    padding: 5,
    fontSize: 16,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    height: 35,
  },
  cardTitleTextBox: {
    padding: 5,
    fontSize: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    borderRadius: 15,
    flexDirection: "column",
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    alignSelf: "auto",
    padding: 5,
  },
  pickerView: {
    paddingHorizontal: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 8,
  },
  picker: {
    margin: 8,
    height: 20,
  },
});

export default InformAddressManual;
