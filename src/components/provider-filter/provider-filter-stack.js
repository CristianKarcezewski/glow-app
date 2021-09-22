import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderFilter from "./provider-filter";
import LocationSelect from "../location-select/location-select";
import ProviderSelect from "../provider-select/provider-select";

class ProviderFilterStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
    this.state = {
      providersList: [],
    };
  }

  setProviders(providers) {
    if (providers.length > 0) {
      this.setState({ ...this.state, providersList: providers });
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
          name="select-provider"
          options={{
            title: "Selecionar profissional",
            headerShown: true,
          }}
        >
          {(props) => (
            <ProviderSelect
              {...props}
              filterEmitter={this.props.searchFilterEmitter}
              providersList={this.state.providersList}
              setProviders={this.setProviders.bind(this)}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderFilterStack;
