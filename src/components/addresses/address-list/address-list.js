import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarker, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  loadUserAddresses,
  removeUserAddress,
} from "../../../services/address-service";
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
console.log(this.props.loginEmitter.userData)
    loadUserAddresses(
      Platform.OS,
      this.props.loginEmitter.userData.authorization
    )
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

  setAddresses() {
    this.setState({
      ...this.state,
      addresses: this.props.filterEmitter.addresses,
    });
  }

  _handleAddressUpdate(address) {
    this.props.updateAddress(address);
    this.props.navigation.navigate("inform-address");
  }

  componentDidMount() {
    this.props.filterEmitter.subscribe(
      this.addressesListKey,
      this.setAddresses.bind(this)
    );
    if (this.props.filterEmitter.addresses.length == 0) {
      this._handleLoadUserAddresses();
    }
  }

  componentWillUnmount() {
    this.props.filterEmitter.unsubscribe(this.addressesListKey);
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
      if (this.state.addresses.length > 0) {
        return (
          <View style={{ flex: 1, padding: 10 }}>
            <FlatList
              keyExtractor={(item) => item.addressId.toString()}
              data={this.props.filterEmitter.addresses}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this._handleAddressUpdate(item)}
                >
                  <CardResult
                    address={item}
                    // locationsEmitter={this.props.locationsEmitter}
                    loginEmitter={this.props.loginEmitter}
                    filterEmitter={this.props.filterEmitter}
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
      locationLabel: "",
    };
  }

  setLabel() {
    if (this.props.address?.state?.uf && this.props.address?.city?.name) {
      this.setState({
        ...this.state,
        locationLabel: `${this.props.address.state.uf} - ${this.props.address.city.name}`,
      });
    }
  }

  componentDidMount() {
    this.setLabel();
  }

  validateRemoveAddress(id) {
    Alert.alert(
      "Remover endereço",
      "Tem certeza que deseja remover este endereço?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "OK", onPress: () => this._handleAddressRemove(id) },
      ],
      { cancelable: false }
    );
  }

  _handleAddressRemove(id) {
    if (id) {
      this.setState({ ...this.state, loading: true });

      removeUserAddress(
        Platform.OS,
        this.props.loginEmitter.userData.authorization,
        id
      )
        .then(({ status, data }) => {
          if (status === 200) {
            let i = this.props.filterEmitter.addresses.findIndex(
              (addr) => addr.addressId === id
            );
            this.props.filterEmitter.addresses.splice(i, 1);
            this.setState({ ...this.state, loading: false });
            this.props.filterEmitter.setAddresses();
          } else {
            this.setState({ ...this.state, loading: false });
            Toast.show("Erro ao deletar o endereço", {
              duration: Toast.durations.LONG,
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          this.setState({ ...this.state, loading: false });
          Toast.show("Falha ao deletar o endereço", {
            duration: Toast.durations.LONG,
          });
        });
    }
  }

  render() {
    return (
      <View style={style.cardResultContainer}>
        <View style={style.cardResultImage}>
          <FontAwesomeIcon icon={faMapMarker} size={40} style={{ flex: 1 }} />
        </View>

        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={style.cardResultName}>{this.props.address.name}</Text>
          <Text style={{ fontSize: 20 }}>{this.state.locationLabel}</Text>
          <Text>{`${this.props.address.district}`}</Text>
          <Text>{`${this.props.address.street}-${this.props.address.number}`}</Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() =>
              this.validateRemoveAddress(this.props.address.addressId)
            }
          >
            <FontAwesomeIcon
              icon={faTrash}
              color={"#db382f"}
              size={30}
              style={{ flex: 1 }}
            />
          </TouchableOpacity>
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
    minHeight: 100,
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
