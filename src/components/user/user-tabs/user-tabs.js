import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMapMarker,
  faAddressCard,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import UserAddressStack from "../user-address-stack";
import UserData from "../user-data";

class UserTabs extends Component {
  constructor(props) {
    super(props);
    this.tabs = createBottomTabNavigator();
    this.state = {
      headerShown: true,
    };
  }

  showHeader(value) {
    this.setState({ ...this.state, headerShown: value });
  }

  render() {
    return (
      <this.tabs.Navigator
        initialRouteName="user-info"
        screenOptions={({ route, navigation }) => ({
          headerShown: this.state.headerShown,
          tabBarLabelStyle: { fontSize: 20 },
          tabBarIcon: ({ focused }) => {
            if (route.name === "user-info") {
              return (
                <FontAwesomeIcon
                  icon={faAddressCard}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }
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
          name="user-info"
          options={({ navigation }) => ({
            title: "Sua conta",
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => this.props.navigation.goBack()}
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
            <UserData
              {...props}
              loginEmitter={this.props.loginEmitter}
              showHeader={this.showHeader.bind(this)}
            />
          )}
        </this.tabs.Screen>

        <this.tabs.Screen
          name="user-addresses-stack"
          options={{ title: "Seus endereços" }}
        >
          {(props) => (
            <UserAddressStack
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

export default UserTabs;
