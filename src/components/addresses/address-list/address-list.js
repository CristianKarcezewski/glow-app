import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { loadUserAddresses } from "../../../services/address-service";
import Toast from "react-native-root-toast";

class AddressList extends Component {
  addressesListKey = "addressesListKey";

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  _handleLoadUserAddresses() {
    this.setState({ ...this.state, loading: true });
    loadUserAddresses(Platform.OS, this.props.loginEmitter.token)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.filterEmitter.setAddresses(data);
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao carregar endereços", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro ao carregar endereços", {
          duration: Toast.durations.LONG,
        });
      });
  }

  componentDidMount() {
    if (this.props.filterEmitter.addresses.length == 0) {
      this._handleLoadUserAddresses();
    }
  }

  _handleAddressUpdate(addresses) {
    this.setState({ ...this.state, addresses: addresses });
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
      if (this.props.filterEmitter.addresses.length > 0) {
        return (
          <View style={{ flex: 1, padding: 10 }}>
            <FlatList
              keyExtractor={(item) => item.addressId.toString()}
              data={this.props.filterEmitter.addresses}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => console.log(item)}>
                  <CardResult
                    address={item}
                    locationsEmitter={this.props.locationsEmitter}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        );
      } else {
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 20 }}>
              Parece que você ainda não possui endereços
            </Text>
            <Text style={{ fontSize: 20 }}>
              Clique no botão de " + " acima para adicionar
            </Text>
          </View>
        );
      }
    }
  }
}

class CardResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateUf: null,
      cityName: null,
    };
  }

  componentDidMount() {
    let st, ct;
    if (this.props.address.stateId) {
      st = this.props.locationsEmitter.states.find((x) => {
        return x.stateId === this.props.address.stateId;
      });
    }
    if (this.props.address.stateId && this.props.address.cityId) {
      ct = this.props.locationsEmitter.getCitiesByStateId().find((x) => {
        return x.cityId === this.props.address.cityId;
      });
    }
    this.setState({
      ...this.state,
      stateName: st?.uf || null,
      cityName: ct?.name || null,
    });
  }

  render() {
    return (
      <View style={style.cardResultContainer}>
        <View style={style.cardResultImage}>
          <FontAwesomeIcon icon={faMapMarker} size={40} style={{ flex: 1 }} />
        </View>

        <View style={{ flex: 4, justifyContent: "center" }}>
          <Text style={style.cardResultName}>{this.props.address.name}</Text>
          <Text style={{ fontSize: 20 }}>
            {`${this.state.stateUf ? this.state.stateUf + " - " : ""}
            ${this.state.cityName ? this.state.cityName : ""}`}
          </Text>
          <Text>{`${this.props.address.neighborhood}`}</Text>
          <Text>{`${this.props.address.street}-${this.props.address.number}`}</Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  cardResultContainer: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderColor: "#db382f",
    borderWidth: 1,
    borderRadius: 20,
    height: 100,
  },
  cardResultImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 40,
    margin: 10,
  },
  cardResultName: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default AddressList;
