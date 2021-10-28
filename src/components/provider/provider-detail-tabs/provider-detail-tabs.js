import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAddressCard,
  faComments,
  faPhotoVideo,
} from "@fortawesome/free-solid-svg-icons";
import ProviderDetails from "./provider-details";
import Chat from "../chat";
import ProviderGalleryStack from "./provider-gallery-stack";

class ProviderDetailTabs extends Component {
  constructor(props) {
    super(props);
    this.tabs = createBottomTabNavigator();
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
            if (route.name === "provider-gallery-stack") {
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
          {(props) => <ProviderDetails {...props} />}
        </this.tabs.Screen>

        <this.tabs.Screen name="chat" options={{ title: "Chat" }}>
          {(props) => <Chat {...props} />}
        </this.tabs.Screen>

        <this.tabs.Screen 
        name="provider-gallery-stack"
         options={{ title: "Galeria" }}
         >
          {(props) => (
          <ProviderGalleryStack 
            {...props}
            />)}
        </this.tabs.Screen>
      </this.tabs.Navigator>
    );
  }
}
export default ProviderDetailTabs;