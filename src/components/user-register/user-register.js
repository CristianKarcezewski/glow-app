import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

class UserRegister extends Component {
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
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={style.imageContainer}>
          <Image
            style={style.imageLogo}
            source={require("../../assets/glow-logo.png")}
          />
        </View>
        <View style={style.container}>
          <TextInput
            style={style.formField}
            maxLength={50}
            type="nome"
            placeholder="Nome"
          />
          <TextInput
            style={style.formField}
            maxLength={50}
            type="email"
            placeholder="E-mail"
          />
          <TextInput
            style={style.formField}
            type="telefone"
            placeholder="Tefefone"
          />

          <View style={style.pickerView}>
            <Picker
              style={style.picker}
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

          <View style={style.pickerView}>
            <Picker
              style={style.picker}
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
            style={style.formField}
            type="senha"
            placeholder="  Senha"
          />
          <TextInput
            style={style.formField}
            type="confirmaSenha"
            placeholder="  Confirma Senha"
          />
          <TouchableHighlight
            style={style.registerButton}
            onPress={() => this._register()}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Cadastrar
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    marginTop: 30,
    width: 150,
    height: 40,
  },
  container: {
    flex: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formField: {
    width: "80%",
    paddingHorizontal: 20,
    margin: 5,
    fontSize: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  pickerView: {
    width: "80%",
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    borderRadius: 20,
  },
  picker: {
    margin: 5,
  },
  registerButton: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
  },
});
export default UserRegister;
