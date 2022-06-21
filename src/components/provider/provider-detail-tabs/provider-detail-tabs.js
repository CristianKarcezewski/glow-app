import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAddressCard,
  faComments,
  faPhotoVideo,
} from "@fortawesome/free-solid-svg-icons";
import Toast from "react-native-root-toast";
import ProviderDetails from "./provider-details";
import Chat from "../chat";
import Gallery from "../../gallery";

class ProviderDetailTabs extends Component {
  constructor(props) {
    super(props);
    this.tabs = createBottomTabNavigator();
  }

  userInform() {
    Toast.show("Para acessar a Galeria e o Chat - Faça o Login", {
      duration: Toast.durations.LONG,
    });
  }

  render() {
    return (
      <this.tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (route.name === "provider-details") {
              return (
                <FontAwesomeIcon
                  icon={faAddressCard}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }
            if (route.name === "chat") {
              return (
                <FontAwesomeIcon
                  icon={faComments}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }
            if (route.name === "gallery") {
              return (
                <FontAwesomeIcon
                  icon={faPhotoVideo}
                  color={focused ? "#db382f" : "black"}
                  size={24}
                />
              );
            }
          },
          tabBarLabelStyle: { fontSize: 20 },
        })}
      >
        <this.tabs.Screen name="provider-details" options={{ title: "Sobre" }}>
          {(props) => (
            <ProviderDetails {...props} getUserInfo={this.props.getUserInfo} />
          )}
        </this.tabs.Screen>

        {this.props.loginEmitter.userLoggedIn > 0 ? (
          <this.tabs.Screen name="chat" options={{ title: "Chat" }}>
            {(props) => <Chat {...props} />}
          </this.tabs.Screen>
        ) : (
          this.userInform()
        )}

        {this.props.loginEmitter.userLoggedIn > 0 ? (
          <this.tabs.Screen name="gallery" options={{ title: "Galeria" }}>
            {(props) => <Gallery {...props} />}
          </this.tabs.Screen>
        ) : null}
      </this.tabs.Navigator>
    );
  }
}
export default ProviderDetailTabs;
