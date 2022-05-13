import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAddressCard, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import ProviderRegisterStack from "./provider-register-stack";
import ProviderAddressStack from "./provider-address-stack";

class ProviderRegisterTabs extends Component {
  constructor(props) {
    super(props);
    this.tabs = createBottomTabNavigator();
  }

  showHeader(value) {
    this.setState({ ...this.state, headerShown: value });
  }

  render() {
    return (
      <this.tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (route.name === "provider-register-stack") {
              return (
                <FontAwesomeIcon
                  icon={faAddressCard}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }
            if (route.name === "provider-address-stack") {
              return (
                <FontAwesomeIcon
                  icon={faMapMarker}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }
          },
        })}
      >
        <this.tabs.Screen
          name="provider-register-stack"
          options={{ title: "Ocupação" }}
        >
          {(props) => (
            <ProviderRegisterStack
              {...props}
              loginEmitter={this.props.loginEmitter}
              registerEmitter={this.props.providerRegisterEmitter}
            />
          )}
        </this.tabs.Screen>

        <this.tabs.Screen
          name="provider-address-stack"
          options={{ title: "Seus endereços" }}
        >
          {(props) => (
            <ProviderAddressStack
              {...props}
              loginEmitter={this.props.loginEmitter}
              addressesProviderFilterEmitter={
                this.props.addressesProviderFilterEmitter
              }
              // locationsEmitter={this.props.locationsEmitter}
              showHeader={this.showHeader.bind(this)}
            />
          )}
        </this.tabs.Screen>

        {/* <this.tabs.Screen
          name="provider-galery"
          options={{ title: "Galeria" }}
        >
          {(props) => (
            <ProviderAddressStack
              {...props}
              loginEmitter={this.props.loginEmitter}
              addressesProviderFilterEmitter={
                this.props.addressesProviderFilterEmitter
              }
              // locationsEmitter={this.props.locationsEmitter}
              showHeader={this.showHeader.bind(this)}
            />
          )}
        </this.tabs.Screen> */}
      </this.tabs.Navigator>
    );
  }
}

export default ProviderRegisterTabs;
