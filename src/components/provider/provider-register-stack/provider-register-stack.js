import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderSelect from "../../provider-select"
import ProviderRegister from "./provider-register";

class ProviderRegisterStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }

  _setProvider(providerType) {
    if (providerType) {
      console.log(providerType);
    }
  }

  render() {
    return (
      <this.stack.Navigator
        initialRouteName="provider-register"       
      >
        <this.stack.Screen
          name="provider-register"
          options={{
            title: "Cadastro de Profissional",
            headerShown: false,
          }}
        >
          {(props) => <ProviderRegister {...props} />}
        </this.stack.Screen>
       
        <this.stack.Screen
          name="select-provider-type"
          options={{
            title: "Selecionar tipo de profissinal",
            headerShown: true,
          }}
        >
          {(props) => (
            <ProviderSelect
              {...props}            
              setProvider={this._setProvider.bind(this)}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderRegisterStack;
