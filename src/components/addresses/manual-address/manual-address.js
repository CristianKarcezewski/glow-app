import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-root-toast";
import { loadStates, loadCities } from "../../../services/location-service";
import { findViacepLocation } from "../../../services/viacep-service";
import { registerAddress } from "../../../services/address-service";
import LocationFilterModal from "../../modals/location-filter-modal";

class ManualAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      postalCode: null,
      selectedState: null,
      selectedCity: null,
      neighborhood: null,
      street: null,
      number: null,
      complement: null,
      referencePoint: null,
      loading: false,
      statesModal: false,
      citiesModal: false,
    };
  }

  _handleLoadStates() {
    this.setState({ ...this.state, loading: true });
    loadStates(Platform.OS)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.setStates(data);
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar estados.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleLoadCities(stateId) {
    this.setState({
      ...this.state,
      statesModal: false,
      loading: true,
    });
    loadCities(Platform.OS, stateId)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.setCities(data);
          this.setState({
            ...this.state,
            loading: false,
            selectedState: stateId,
          });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar cidades.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _closeStatesModal(data) {
    if (data) {
      let len = this.props.emitters.locationsEmitter.getCitiesByStateId(
        data.stateId
      ).length;

      if (len == 0) {
        this._handleLoadCities(data.stateId);
      } else {
        this.setState({
          ...this.state,
          selectedState: data.stateId,
          statesModal: false,
        });
      }
    } else {
      this.setState({
        ...this.state,
        statesModal: false,
      });
    }
  }

  _closeCitiesModal(data) {
    if (data) {
      this.setState({
        ...this.state,
        selectedCity: data.cityId,
        citiesModal: false,
      });
    } else {
      this.setState({
        ...this.state,
        citiesModal: false,
      });
    }
  }

  modalData(showStates) {
    if (showStates) {
      this.setState({ ...this.state, selectedCity: null });
      return this.props.emitters.locationsEmitter.states;
    }
    if (!showStates && this.state.selectedState) {
      let ct = this.props.emitters.locationsEmitter.getCitiesByStateId(
        this.state.selectedState
      );
      return ct;
    }
    return [];
  }

  _handleAddressRegister() {
    this.setState({ ...this.state, loading: true });
    let address = {
      name: this.state.name,
      postalCode: this.state.postalCode,
      stateId: this.state.selectedState,
      cityId: this.state.selectedCity,
      neighborhood: this.state.neighborhood,
      street: this.state.street,
      number: parseInt(this.state.number.replace(/\D/g, "")),
      complement: this.state.complement,
      referencePoint: this.state.referencePoint,
    };

    registerAddress(
      Platform.OS,
      this.props.emitters.loginEmitter.token,
      address
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false });
          this.props.addressesEmitter.setAddresses([data]);
          this.props.close();
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

  _handleViacep(postalCode) {
    this.setState({ ...this.state, loading: true });
    findViacepLocation(postalCode)
      .then(({ status, data }) => {
        if (status === 200) {
          let state = this.props.emitters.locationsEmitter.states.find((x) => {
            x.uf.toLowerCase() === data.uf.toLowerCase();
          });
          let city =
            state != null
              ? this.props.emitters.locationsEmitter
                  .getCitiesByStateId(state.stateId)
                  .find((x) =>
                    x.name.toLowerCase().includes(data.localidade.toLowerCase())
                  )
              : null;
          console.log(state, city);
          this.setState({
            ...this.state,
            loading: false,
            postalCode: data.cep,
            selectedState: state != null ? state.stateId : null,
            selectedCity: city != null ? city.cityId : null,
            neighborhood: data.bairro,
            street: data.logradouro,
          });
        } else {
          this.setState({ ...this.state, loading: false });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com a internet", {
          duration: Toast.durations.LONG,
        });
      });
  }

  autocompleteForm(value) {
    var st = value.replace(/\D/g, "");
    if (st.length == 8) {
      this._handleViacep(st);
    } else {
      this.setState({ ...this.state, postalCode: st });
    }
  }

  componentDidMount() {
    if (this.props.emitters.locationsEmitter.states.length == 0) {
      this._handleLoadStates();
    }
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
          <View
            style={{ flex: 8, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Cadastre um endereço:</Text>
            <TextInput
              style={
                this.state.validName
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              placeholder="Nome do endereço"
              onChangeText={(value) =>
                this.setState({ ...this.state, name: value })
              }
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
              onChangeText={(value) => this.autocompleteForm(value)}
              value={this.state.postalCode}
            />
            <LocationFilterModal
              visible={this.state.statesModal}
              close={this._closeStatesModal.bind(this)}
              searchData={this.modalData.bind(this)}
              showStates={true}
            />
            <TouchableOpacity
              style={style.modalButton}
              onPress={() => {
                this.setState({ ...this.state, statesModal: true });
              }}
            >
              <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                {this.state.selectedState
                  ? this.props.emitters.locationsEmitter.states.find(
                      (x) => x.stateId === this.state.selectedState
                    ).name
                  : "Selecionar estado"}
              </Text>
            </TouchableOpacity>

            <LocationFilterModal
              visible={this.state.citiesModal}
              close={this._closeCitiesModal.bind(this)}
              searchData={this.modalData.bind(this)}
            />
            <TouchableOpacity
              style={style.modalButton}
              onPress={() => {
                this.setState({ ...this.state, citiesModal: true });
              }}
            >
              <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                {this.state.selectedCity
                  ? this.props.emitters.locationsEmitter
                      .getCitiesByStateId(this.state.selectedState)
                      .find((x) => x.cityId === this.state.selectedCity).name
                  : "Selecionar cidade"}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={
                this.state.validName
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              placeholder="Bairro"
              onChangeText={(value) =>
                this.setState({ ...this.state, neighborhood: value })
              }
              value={this.state.neighborhood}
            />
            <TextInput
              style={
                this.state.validName
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              placeholder="Rua"
              onChangeText={(value) =>
                this.setState({ ...this.state, street: value })
              }
              value={this.state.street}
            />
            <TextInput
              style={
                this.state.validName
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              placeholder="Numero"
              onChangeText={(value) =>
                this.setState({ ...this.state, number: value })
              }
              value={this.state.number}
            />
            <TextInput
              style={
                this.state.validName
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              placeholder="Complemento"
              onChangeText={(value) =>
                this.setState({ ...this.state, complement: value })
              }
              value={this.state.complement}
            />
            <TextInput
              style={
                this.state.validName
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              placeholder="Ponto de referencia"
              onChangeText={(value) =>
                this.setState({ ...this.state, referencePoint: value })
              }
              value={this.state.referencePoint}
            />
          </View>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              style={{ ...style.buttons, backgroundColor: "#db382f" }}
              onPress={() => this._handleAddressRegister()}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
                Salvar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.buttons}
              onPress={() => this.props.close()}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "black" }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const style = StyleSheet.create({
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
  buttons: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    elevation: 10,
  },
  modalButton: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 20,
    fontSize: 20,
  },
});

export default ManualAddress;
