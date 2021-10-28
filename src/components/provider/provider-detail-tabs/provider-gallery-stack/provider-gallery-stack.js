import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gallery from "../../../gallery";
import AddPhoto from "../../../add-photo";
import {Text} from "react-native";


class ProviderGalleryStack extends Component {

  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }
  

  render() {
    console.log("Aqui")

    return (
      <this.stack.Navigator
        initialRouteName="gallery"
        // screenListeners={({ route }) => {
        //   if (route.name === "gallery") {
        //     this.props.toggleHeader(true);
        //   } else {
        //     this.props.toggleHeader(false);
        //   }
        // }}
      >
        <this.stack.Screen
          name="gallery"
          options={{
            title: "Galeria Profissionais",
            // headerShown: false,
            
          }}
        >
          {(props) => (
            <Gallery
              {...props}
              //searchFilterEmitter={this.props.searchFilterEmitter}
            />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="addPhoto"
          options={{
            title: "Galeria Profissionais",
            // headerShown: false,
          }}
        >
          {(props) => (
            <AddPhoto
              {...props}
              //searchFilterEmitter={this.props.searchFilterEmitter}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

export default ProviderGalleryStack;
