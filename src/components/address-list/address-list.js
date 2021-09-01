import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Address from "../../models/address";
import image from "../../assets/endereco.jpg";
import ActionButton from "react-native-action-button";
import commonStyles from "../../shared/commonStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { loadUserAddresses } from "../../services/address-service";
import Toast from "react-native-root-toast";

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      loading: false,
    };
  }

  _handleLoadUserAddresses() {
    this.setState({ ...this.state, loading: true });
    loadUserAddresses(Platform.OS, this.props.emitters.loginEmitter.token)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.states = data;
          this.setState({ ...this.state, loading: false, addresses: data });
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
    this._handleLoadUserAddresses();
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
                <CardResult address={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
  }
}

class CardResult extends Component {
  render() {
    let check = null;
    if (this.props.address.active === true) {
      check = (
        <View style={style.done}>
          <Icon name="check" size={20} color={commonStyles.colors.secondary} />
        </View>
      );
    } else {
      check = <View style={style.pending} />;
    }

    return (
      <View style={style.cardResultContainer}>
        <View style={style.cardResultImage}>
          <Image
            source={image}
            style={{ flex: 1, width: "100%", borderRadius: 30 }}
          ></Image>
        </View>
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
