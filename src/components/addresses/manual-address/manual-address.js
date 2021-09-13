import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Toast from "react-native-root-toast";
import { findViacepLocation } from "../../../services/viacep-service";
import { registerAddress } from "../../../services/address-service";

class ManualAddress extends Component {
  componentKey = "ManualAddress";
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      postalCode: null,
      stateName: null,
      cityName: null,
      neighborhood: null,
      street: null,
      number: null,
      complement: null,
      referencePoint: null,
      loading: false,
    };
  }

  _handleAddressRegister() {
    this.setState({ ...this.state, loading: true });
    let address = {
      name: this.state.name,
      postalCode: this.state.postalCode,
      stateId: this.props.filterEmitter.filter.stateId,
      cityId: this.props.filterEmitter.filter.cityId,
      neighborhood: this.state.neighborhood,
      street: this.state.street,
      number: parseInt(this.state.number.replace(/\D/g, "")),
      complement: this.state.complement,
      referencePoint: this.state.referencePoint,
    };

    registerAddress(Platform.OS, this.props.loginEmitter.token, address)
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false });
          this.props.filterEmitter.setAddresses([data]);
          this.props.navigation.goBack();
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao salvar endereço", {
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
          this._bindViacepLocation(data);
          this.setState({
            ...this.state,
            loading: false,
            postalCode: data.cep,
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

  _bindViacepLocation(data) {
    let st, ct;
    if (data?.uf) {
      st = this.props.locationsEmitter.states.find((x) => {
        return x.uf.toLowerCase() === data.uf.toLowerCase();
      });
    }
    if (st?.stateId && data?.localidade) {
      ct = this.props.locationsEmitter.getCitiesByStateId().find((x) => {
        return x.name.toLowerCase().includes(data.localidade.toLowerCase());
      });
    }

    this.props.filterEmitter.setFilter({
      ...this.props.locationsEmitter.filter,
      stateId: st?.stateId || null,
      cityId: ct?.cityId || null,
    });
  }

  _handleLoadStates() {
    this.setState({ ...this.state, loading: true });
    loadStates(Platform.OS)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.locationsEmitter.setStates(data);
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar estados.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleLoadCities(stateId) {
    this.setState({
      ...this.state,
      loading: true,
    });
    loadCities(Platform.OS, stateId)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.locationsEmitter.setCities(data);
          this.cities = data;
          this.setState({
            ...this.state,
            loading: false,
          });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar cidades.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
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

  _changeFilter() {
    this.setState({ ...this.state, loading: true });
    let st, ct;
    if (this.props.filterEmitter.filter.stateId) {
      st = this.props.locationsEmitter.states.find((x) => {
        return x.stateId === this.props.filterEmitter.filter.stateId;
      });
    }
    if (
      this.props.filterEmitter.filter.stateId &&
      this.props.filterEmitter.filter.cityId
    ) {
      ct = this.props.locationsEmitter.cities.find((x) => {
        return x.cityId === this.props.filterEmitter.filter.cityId;
      });
    }
    this.setState({
      ...this.state,
      stateName: st?.name || null,
      cityName: ct?.name || null,
      loading: false,
    });
  }

  componentDidMount() {
    this.props.filterEmitter.subscribe(
      this.componentKey,
      this._changeFilter.bind(this)
    );
  }

  componentWillUnmount() {
    this.props.filterEmitter.unsubscribe(this.componentKey);
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
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 30,
            }}
          >
            <TextInput
              style={style.formField}
              maxLength={50}
              placeholder="Nome do endereço (ex: casa)"
              onChangeText={(value) =>
                this.setState({ ...this.state, name: value })
              }
              value={this.state.name}
            />

            <TextInput
              style={style.formField}
              maxLength={10}
              placeholder="CEP"
              onChangeText={(value) => this.autocompleteForm(value)}
              value={this.state.postalCode}
            />

            <TouchableOpacity
              style={style.locationButton}
              onPress={() => this.props.navigation.navigate("select-state")}
            >
              <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                {this.state.stateName
                  ? this.state.stateName
                  : "Selecionar estado"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.locationButton}
              onPress={() => this.props.navigation.navigate("select-city")}
            >
              <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                {this.state.cityName
                  ? this.state.cityName
                  : "Selecionar cidade"}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={style.formField}
              maxLength={50}
              placeholder="Bairro"
              onChangeText={(value) =>
                this.setState({ ...this.state, neighborhood: value })
              }
              value={this.state.neighborhood}
            />

            <TextInput
              style={style.formField}
              maxLength={50}
              placeholder="Rua"
              onChangeText={(value) =>
                this.setState({ ...this.state, street: value })
              }
              value={this.state.street}
            />

            <TextInput
              style={style.formField}
              maxLength={50}
              placeholder="Numero"
              keyboardType={"numeric"}
              onChangeText={(value) =>
                this.setState({ ...this.state, number: value })
              }
              value={this.state.number}
            />

            <TextInput
              style={style.formField}
              maxLength={50}
              placeholder="Complemento"
              onChangeText={(value) =>
                this.setState({ ...this.state, complement: value })
              }
              value={this.state.complement}
            />

            <TextInput
              style={style.formField}
              maxLength={50}
              placeholder="Ponto de referencia"
              onChangeText={(value) =>
                this.setState({ ...this.state, referencePoint: value })
              }
              value={this.state.referencePoint}
            />

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
              onPress={() => this.props.navigation.goBack()}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "black" }}
              >
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
}

const style = StyleSheet.create({
  formField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
  },
  buttons: {
    flex: 1,
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    elevation: 10,
  },
  locationButton: {
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
