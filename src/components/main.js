import React, { Component } from "react";
import { NavigationContainer, Platform } from "@react-navigation/native";
import LoginEmitter from "../emitters/login-emitter";
import LocationsEmitter from "../emitters/locations-emitter";
import GlowTheme from "../shared/theme";
import DrawerNavigator from "./navigators/drawer";

class Main extends Component {
  constructor() {
    super();
    this.emitters = {
      loginEmitter: new LoginEmitter(),
      locationsEmitter: new LocationsEmitter(Platform.OS),
    };
  }

  render() {
    return (
      <NavigationContainer theme={GlowTheme}>
        <DrawerNavigator emitters={this.emitters} />
      </NavigationContainer>
    );
  }
}

export default Main;
