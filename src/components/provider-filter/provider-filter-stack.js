import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderFilter from "./provider-filter";
import LocationSelect from "../location-select/location-select";
import ProviderSelect from "../provider-select/provider-select";

class ProviderFilterStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }

  _setProvider(providerType) {
    if ( providerType){
      this.props.filterEmitter.setFilter({
          ...this.props.filterEmitter.filter,
          providerType: providerType
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
              filterEmitter={this.props.searchFilterEmitter}
              setProvider={this._setProvider.bind(this)}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderFilterStack;
