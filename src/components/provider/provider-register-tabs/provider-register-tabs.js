import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAddressCard,
  faMapMarker,
  faPhotoVideo,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import ProviderRegisterStack from "./provider-register-stack";
import ProviderAddressStack from "./provider-address-stack";
import ProviderGalleryStack from "./provider-gallery-stack";
import Schedule from "../../schedule";


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
            if (route.name === "provider-gallery-stack") {
              return (
                <FontAwesomeIcon
                  icon={faPhotoVideo}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }

            if (route.name === "schedule") {
              return (
                <FontAwesomeIcon
                  icon={faBell}
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
          name="provider-gallery-stack"
          options={{ title: "Galeria" }}
        >
          {(props) => <ProviderGalleryStack {...props} />}
        </this.tabs.Screen>

        <this.tabs.Screen name="schedule" options={{ title: "Agenda" }}>
          {(props) => <Schedule {...props} />}
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

        {/* {this.props.loginEmitter.userLoggedIn == 2 ? (
          <this.drawer.Screen
            name="schedule"
            component={Schedule}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Agenda",
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
          />
        ) : null} */}
      </this.tabs.Navigator>
    );
  }
}

export default ProviderRegisterTabs;
