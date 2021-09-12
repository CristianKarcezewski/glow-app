import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMapMarker,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

class UserTabs extends Component {
  constructor(props) {
    super(props);
    this.tabs = createBottomTabNavigator();
  }

  render() {
    return (
      <this.tabs.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: true,
          tabBarLabelStyle: { fontSize: 20 },
          tabBarIcon: ({ focused }) => {
            if (route.name === "user-addresses") {
              return (
                <FontAwesomeIcon
                  icon={faMapMarker}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }
          },
          headerRight: () => (
            <TouchableOpacity
              style={style.headerLoginButton}
              onPress={() =>
                this.setState({ ...this.state, addressModal: true })
              }
            >
              <FontAwesomeIcon icon={faPlus} color={"#fff"} size={20} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
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
        <this.tabs.Screen
          name="user-addresses"
          options={{ title: "Seus endereços" }}
        >
          {(props) => (
            <AddressesList
              {...props}
              addressesEmitter={this.addressesEmitter}
              loginEmitter={this.props.emitters.loginEmitter}
            />
          )}
        </this.tabs.Screen>
      </this.tabs.Navigator>
    );
  }
}

const style = StyleSheet.create({
  headerLoginButton: {
    borderRadius: 10,
    padding: 3,
    width: 70,
    height: 30,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
    justifyContent: "center",
    elevation: 20,
  },
});

export default UserTabs;
