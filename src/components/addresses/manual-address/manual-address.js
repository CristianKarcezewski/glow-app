import React, { Component, State } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import Toast from "react-native-root-toast";
import { findViacepLocation } from "../../../services/location-service";
import {
  registerUserAddress,
  updateAddress,
} from "../../../services/address-service";

class ManualAddress extends Component {
  componentKey = "ManualAddress";
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      postalCode: null,
      stateName: null,
      cityName: null,
      district: null,
      street: null,
      number: null,
      complement: null,
      referencePoint: null,
      loading: false,
    };
  }

  saveAddress() {
    // TODO: Validar campos

    if (this.props.address) {
      this._handleAddressUpdate();
    } else {
      this._handleAddressRegister();
    }
  }

  _handleAddressUpdate() {
    this.setState({ ...this.state, loading: true });

    let address = {
      addressId: this.props.address.addressId,
      name: this.state.name,
      postalCode: this.state.postalCode,
      stateUf: this.props.filterEmitter.filter.stateUf,
      cityId: this.props.filterEmitter.filter.cityId,
      district: this.state.district,
      street: this.state.street,
      number: parseInt(this.state.number.replace(/\D/g, "")),
      complement: this.state.complement,
      referencePoint: this.state.referencePoint,
    };
    updateAddress(
      Platform.OS,
      this.props.loginEmitter.userData.authorization,
      address
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false });
          let index = this.props.filterEmitter.addresses.findIndex(
            (addr) => addr.addressId === data.addressId
          );
          this.props.filterEmitter.addresses[index] = data;
          this.props.navigation.goBack();
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao atualizar endereço", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro ao carregar endereço", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleAddressRegister() {
    this.setState({ ...this.state, loading: true });
    let address = {
      name: this.state.name,
      postalCode: this.state.postalCode,
      stateUf: this.props.filterEmitter.filter.stateUf,
      cityId: this.props.filterEmitter.filter.cityId,
      district: this.state.district,
      street: this.state.street,
      number: parseInt(this.state.number.replace(/\D/g, "")),
      complement: this.state.complement,
      referencePoint: this.state.referencePoint,
    };

    registerUserAddress(
      Platform.OS,
      this.props.loginEmitter.userData.authorization,
      address
    )
      .then(({ status, data }) => {
        console.log(data);
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
        Toast.show("Erro ao carregar endereço", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleViacep(postalCode) {
    this.setState({ ...this.state, loading: true });
    findViacepLocation(
      Platform.OS,
      this.props.loginEmitter.userData.authorization,
      postalCode
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setForm(data);
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

  _handleLoadCities(stateUf) {
    this.setState({
      ...this.state,
      loading: true,
    });
    loadCities(Platform.OS, stateUf)
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

  autocompleteByViacep(value) {
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
    if (this.props.filterEmitter.filter.stateUf) {
      st = this.props.locationsEmitter.states.find((x) => {
        return x.stateUf === this.props.filterEmitter.filter.stateUf;
      });
    }
    if (
      this.props.filterEmitter.filter.stateUf &&
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

  setForm(address) {
    if (address) {
      this.props.filterEmitter.setFilter({
        ...this.props.filterEmitter.filter,
        stateUf: address?.stateUf || null,
        cityId: address?.cityId || null,
      });

      this.setState({
        ...this.state,
        name: address?.name || null,
        postalCode: address?.postalCode || null,
        stateName: address?.state?.name || null,
        cityName: address?.city?.name || null,
        district: address?.district || null,
        street: address?.street || null,
        number: address?.number ? address.number.toString() : null,
        complement: address?.complement || null,
        referencePoint: address?.referencePoint || null,
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.setForm(this.props.address);

    this.props.filterEmitter.subscribe(
      this.componentKey,
      this._changeFilter.bind(this)
    );
  }

  componentWillUnmount() {
    this.props.filterEmitter.unsubscribe(this.componentKey);
    this.props.updateAddress(null);
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
              onChangeText={(value) => this.autocompleteByViacep(value)}
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
                this.setState({ ...this.state, district: value })
              }
              value={this.state.district}
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
              onPress={() => this.saveAddress()}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
                {this.props.address ? "Atualizar" : "Salvar"}
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
