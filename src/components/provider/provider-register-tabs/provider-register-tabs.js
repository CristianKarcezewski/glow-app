import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAddressCard, faComments } from "@fortawesome/free-solid-svg-icons";
import ProviderRegisterStack from "./provider-register-stack";
import ProviderAddressStack from "./provider-address-stack"


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
            if (route.name === "daily-work") {
              return (
                <FontAwesomeIcon
                  icon={faComments}
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
            />
          )}
        </this.tabs.Screen>

        <this.tabs.Screen
          name="provider-addresses-stack"
          options={{ title: "Seus endereços" }}
        >
          {(props) => (
            <ProviderAddressStack
              {...props}
              loginEmitter={this.props.loginEmitter}
              // locationsEmitter={this.props.locationsEmitter}
              addressesFilterEmitter={this.props.addressesFilterEmitter}
              showHeader={this.showHeader.bind(this)}
            />
          )}
        </this.tabs.Screen>
        
      </this.tabs.Navigator>
    );
  }
}

export default ProviderRegisterTabs;
