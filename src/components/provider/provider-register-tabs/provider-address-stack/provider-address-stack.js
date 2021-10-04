import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationSelect from "../../../location-select";
import AddressesList from "../../../addresses/address-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ManualAddress from "../../../addresses/manual-address"

class ProviderAddressStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
    this.state = {
      address: null,
    };
  }

  editAddress(address) {
   // this.setState({ ...this.state, address });
  }

  setLocationState(item) {
    // if (this.props.addressesFilterEmitter.filter?.state?.uf != item?.uf) {
    //   this.props.addressesFilterEmitter.setFilter({
    //     ...this.props.addressesFilterEmitter.filter,
    //     state: item,
    //     city: null,
    //   });
    // }
  }

  setLocationCity(item) {
    // this.props.addressesFilterEmitter.setFilter({
    //   ...this.props.addressesFilterEmitter.filter,
    //   city: item,
    // });
  }

  componentDidMount() {
    this.props.showHeader(false);
  }

  render() {
    return (
      <this.stack.Navigator initialRouteName="provider-register-tabs">
        <this.stack.Screen
          name="provider-register-tabs"
          options={({ navigation }) => ({
            title: "Seus endereços",
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={20}
                  style={{ flex: 1 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={style.headerLoginButton}
                onPress={() => navigation.navigate("inform-address")}
              >
                <FontAwesomeIcon icon={faPlus} color={"#fff"} size={20} />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => (
            // <AddressesList
            //   {...props}
            //   loginEmitter={this.props.loginEmitter}
            //   filterEmitter={this.props.addressesFilterEmitter}
            //   // locationsEmitter={this.props.locationsEmitter}
            //   updateAddress={this.editAddress.bind(this)}
            // />
            <Text>OIIIII</Text>
          )}
        </this.stack.Screen>

        {/* <this.stack.Screen
          name="inform-address"
          options={{
            title: "Adicionar endereço",
            headerShown: true,
          }}
        >
          {(props) => (
            <ManualAddress
              {...props}
              loginEmitter={this.props.loginEmitter}
              // locationsEmitter={this.props.locationsEmitter}
              filterEmitter={this.props.addressesFilterEmitter}
              address={this.state.address}
              updateAddress={this.editAddress.bind(this)}
            />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="select-state"
          options={{
            title: "Selecionar estado",
            headerShown: true,
          }}
        >
          {(props) => (
            <LocationSelect
              {...props}
              onSelectData={this.setLocationState.bind(this)}
            />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="select-city"
          options={{
            title: "Selecionar cidade",
            headerShown: true,
          }}
        >
          {(props) => (
            <LocationSelect
              {...props}
              onSelectData={this.setLocationCity.bind(this)}
              state={this.props.addressesFilterEmitter.filter.state}
            />
          )}
        </this.stack.Screen> */}
      </this.stack.Navigator>
    );
  }
}

const style = StyleSheet.create({
  headerLoginButton: {
    borderRadius: 10,
    padding: 3,
    width: 70,
    height: 30,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
    justifyContent: "center",
    elevation: 20,
  },
});

export default ProviderAddressStack;
