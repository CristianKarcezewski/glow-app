import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderFilter from "./provider-filter";
import ProviderTypeSelect from "../provider-type-select";
import LocationSelect from "../location-select/location-select";

class ProviderFilterStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }

  _setProvider(providerType) {
    if (providerType) {
      this.props.searchFilterEmitter.setFilter({
        ...this.props.searchFilterEmitter.filter,
        providerType: providerType,
      });
    }
  }

  render() {
    return (
      <this.stack.Navigator
        initialRouteName="provider-filter"
        screenListeners={({ route }) => {
          if (route.name === "provider-filter") {
            this.props.toggleHeader(true);
          } else {
            this.props.toggleHeader(false);
          }
        }}
      >
        <this.stack.Screen
          name="provider-filter"
          options={{
            title: "Filtrar Profissionais",
            headerShown: false,
          }}
        >
          {(props) => (
            <ProviderFilter
              {...props}
              locationsEmitter={this.props.locationsEmitter}
              searchFilterEmitter={this.props.searchFilterEmitter}
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
              filterEmitter={this.props.searchFilterEmitter}
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
              filterEmitter={this.props.searchFilterEmitter}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderFilterStack;
