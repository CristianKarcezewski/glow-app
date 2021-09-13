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
      addresses: [],
      loading: false,
    };
  }

  _handleLoadUserAddresses() {
    this.setState({ ...this.state, loading: true });
    loadUserAddresses(Platform.OS, this.props.loginEmitter.token)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.addressesEmitter.setAddresses(data);
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

  _handleAddressUpdate(addresses) {
    this.setState({ ...this.state, addresses: addresses });
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size={"large"}
          color={"#db382f"}
          animating={this.state.laodingComponent}
          style={{ flex: 1 }}
        />
      );
    } else {
      if (this.state.addresses.length > 0) {
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={this.state.address}
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
    this.state =
      this.props.locationsEmitter.states.find((x) => {
        x.uf.toLowerCase() === data.uf.toLowerCase();
      }) || null;
    this.city =
      state != null
        ? this.props.locationsEmitter
            .getCitiesByStateId(state.stateId)
            .find((x) =>
              x.name.toLowerCase().includes(data.localidade.toLowerCase())
            )
        : null;
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
            {`${this.state ? state.uf + " - " : ""}
            ${this.city ? city.name : ""}`}
          </Text>
          <Text>{`${this.props.address.neighbothood}-${this.props.address.street}-${this.props.address.number}`}</Text>
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
