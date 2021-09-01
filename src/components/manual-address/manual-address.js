import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-root-toast";
import { loadStates, loadCities } from "../../services/location-service";

class ManualAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: null,
      selectedCity: null,
      loading: false,
    };
  }

  _handleLoadStates() {
    this.setState({ ...this.state, loading: true });
    loadStates(Platform.OS)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.states = data;
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao carregar localizações", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro ao carregar localizações", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleLoadCities(stateId) {
    this.setState({ ...this.state, loading: true });
    loadCities(Platform.OS, stateId)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.cities = data;
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao carregar localizações", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro ao carregar localizações", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleStateChange(stateId) {
    this.setState({
      ...this.state,
      selectedCity: null,
      selectedState: stateId,
    });
    this.props.emitters.locationsEmitter.cities = [];
    this._handleLoadCities(stateId);
  }

  componentDidMount() {
    if (this.props.emitters.locationsEmitter.states.length == 0) {
      this._handleLoadStates();
    }
  }

  componentWillUnmount() {
    this.props.emitters.locationsEmitter.cities = [];
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
        <View style={style.container}>
          <Text>Cadastre um endereço:</Text>
          <TextInput
            style={
              this.state.validName
                ? style.validFormField
                : style.invalidFormField
            }
            maxLength={50}
            placeholder="Nome do endereço"
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
          <TextInput
            style={
              this.state.validName
                ? style.validFormField
                : style.invalidFormField
            }
            maxLength={50}
            placeholder="CEP"
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
          <View style={style.pickerView}>
            <Picker
              style={style.picker}
              selectedValue={this.state.selectedState}
              onValueChange={(state) => this._handleStateChange(state.stateId)}
            >
              <Picker.Item label={"Estado"} value={""} key={""} />
              {this.props.emitters.locationsEmitter.states?.map((st) => {
                return (
                  <Picker.Item label={st.name} value={st} key={st.stateId} />
                );
              })}
            </Picker>
          </View>

          <View style={style.pickerView}>
            <Picker
              style={style.picker}
              selectedValue={this.state.selectedCity}
              onValueChange={(city) =>
                this.setState({ ...this.state, selectedCity: city.cityId })
              }
            >
              <Picker.Item label={"Cidade"} value={""} key={""} />
              {this.props.emitters.locationsEmitter.cities?.map((city) => {
                return (
                  <Picker.Item
                    label={city.name}
                    value={city}
                    key={city.cityId}
                  />
                );
              })}
            </Picker>
          </View>
          <TextInput
            style={
              this.state.validName
                ? style.validFormField
                : style.invalidFormField
            }
            maxLength={50}
            placeholder="Logradouro"
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
          <TextInput
            style={
              this.state.validName
                ? style.validFormField
                : style.invalidFormField
            }
            maxLength={50}
            placeholder="Numero"
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
          <TextInput
            style={
              this.state.validName
                ? style.validFormField
                : style.invalidFormField
            }
            maxLength={50}
            placeholder="Complemento"
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
          <View>
            <TouchableHighlight
              style={style.saveButton}
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
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  validFormField: {
    width: "80%",
    paddingHorizontal: 20,
    margin: 5,
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
  invalidFormField: {
    width: "80%",
    paddingHorizontal: 20,
    margin: 5,
    fontSize: 18,
    borderColor: "#db382f",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
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
    margin: 10,
  },
});

export default ManualAddress;
