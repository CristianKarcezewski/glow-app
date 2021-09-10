import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderFilter from "./provider-filter";

class ProviderFilterStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }

  render() {
    return (
      <this.stack.Navigator initialRouteName="provider-filter">
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
            <ProviderFilter
              {...props}
              locationsEmitter={this.props.locationsEmitter}
              searchFilterEmitter={this.props.searchFilterEmitter}
              states={true}
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
            <ProviderFilter
              {...props}
              locationsEmitter={this.props.locationsEmitter}
              searchFilterEmitter={this.props.searchFilterEmitter}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderFilterStack;
