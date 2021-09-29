import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ProviderRegister from "../provider-register";
import ProviderTypeSelect from "../../../provider-type-select";
import LocationSelect from "../../../location-select";
import ProviderRegisterEmitter from "../../../../emitters/provider-register-emitter";

class ProviderRegisterStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
    this.providerRegisterEmitter = new ProviderRegisterEmitter();
  }

  setProvider(providerType) {
    if (providerType) {
      this.providerRegisterEmitter.setProviderForm({
        ...this.providerRegisterEmitter.providerForm,
        providerType,
      });
    }
  }

  setLocationState(item) {
    if (this.providerRegisterEmitter.providerForm.state?.uf != item?.uf) {
      this.providerRegisterEmitter.setProviderForm({
        ...this.providerRegisterEmitter.providerForm,
        state: item,
        city: null,
      });
    }
  }

  setLocationCity(item) {
    this.providerRegisterEmitter.setProviderForm({
      ...this.providerRegisterEmitter.providerForm,
      city: item,
    });
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
              loginEmitter={this.props.loginEmitter}
              registerEmitter={this.providerRegisterEmitter}
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
              setProvider={this.setProvider.bind(this)}
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
              state={this.providerRegisterEmitter.providerForm.state}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderRegisterStack;
