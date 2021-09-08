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
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import commonStyles from "../../../shared/commonStyles";
import Icon from "react-native-vector-icons/FontAwesome";
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

  componentDidMount() {
    this.props.addressesEmitter.subscribe(
      this.addressesListKey,
      this._handleAddressUpdate.bind(this)
    );
    this._handleLoadUserAddresses();
  }

  componentWillUnmount() {
    this.props.addressesEmitter.unsubscribe(this.addressesListKey);
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
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("inform-address-manual")
                  }
                >
                  <CardResult
                    address={item}
                    appendAddress={this.appendAddress.bind(this)}
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
  render() {
    return (
      <View style={style.cardResultContainer}>
        <View style={style.cardResultImage}></View>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={style.cardResultName}>{this.props.address.name}</Text>
          <Text style={{ fontSize: 20 }}>{this.props.address.city}</Text>
          <Text style={{ fontSize: 14 }}>
            {this.props.address.publicPlace} ,{this.props.address.number}{" "}
            {this.props.address.complement}
          </Text>
        </View>
        <View style={style.cardResultRating}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() =>
              this.props.navigation.navigate("inform-address-manual")
            }
          >
            <FontAwesomeIcon icon={faTrash} size={25} color={"#db382f"} />
          </TouchableOpacity>
          <View style={style.checkContainer}>{check}</View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({});

export default AddressList;
