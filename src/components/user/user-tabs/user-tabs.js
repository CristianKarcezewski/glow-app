import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import UserAddressStack from "../user-address-stack";

class UserTabs extends Component {
  constructor(props) {
    super(props);
    this.tabs = createBottomTabNavigator();
  }

  render() {
    return (
      <this.tabs.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          tabBarLabelStyle: { fontSize: 20 },
          tabBarIcon: ({ focused }) => {
            if (route.name === "user-addresses-stack") {
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
          name="user-addresses-stack"
          options={{ title: "Seus endereços" }}
        >
          {(props) => (
            <UserAddressStack
              {...props}
              loginEmitter={this.props.loginEmitter}
              locationsEmitter={this.props.locationsEmitter}
              addressesFilterEmitter={this.props.addressesFilterEmitter}
            />
          )}
        </this.tabs.Screen>
      </this.tabs.Navigator>
    );
  }
}

export default UserTabs;
