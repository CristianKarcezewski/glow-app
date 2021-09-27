import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProviderRegister from "../provider-register";
import ProviderTypeSelect from "../../../provider-type-select";
import LocationSelect from "../../../location-select";

class ProviderRegisterStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }

  _setProvider(providerType) {
    if (providerType) {
      this.props.registerEmitter.setProviderForm({
        ...this.props.registerEmitter.providerForm,
        providerType,
      });
    }
  }

  render() {
    return (
      <this.stack.Navigator initialRouteName="provider-register">
        <this.stack.Screen
          name="provider-register"
          options={({ navigation }) => ({
            title: "Cadastro de Profissional",
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => navigation.goBack()}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={20}
                  style={{ flex: 1 }}
                />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => (
            <ProviderRegister
              {...props}
              registerEmitter={this.props.registerEmitter}
            />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="select-provider-type"
          options={{
            title: "Selecionar tipo de profissinal",
            headerShown: true,
          }}
        >
          {(props) => (
            <ProviderTypeSelect
              {...props}
              setProvider={this._setProvider.bind(this)}
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
              locationsEmitter={this.props.locationsEmitter}
              filterEmitter={this.props.addressesFilterEmitter}
              state={true}
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
              locationsEmitter={this.props.locationsEmitter}
              filterEmitter={this.props.addressesFilterEmitter}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderRegisterStack;
