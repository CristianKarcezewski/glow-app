import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginEmitter from "../emitters/login-emitter";
import LocationsEmitter from "../emitters/locations-emitter";
import SearchFilterEmitter from "../emitters/search-filter-emitter";
import GlowTheme from "../shared/theme";
import DrawerNavigator from "./navigators/drawer";

class Main extends Component {
  constructor() {
    super();
    this.loginEmitter = new LoginEmitter();
    this.searchFilterEmitter = new SearchFilterEmitter();
    this.locationsEmitter = new LocationsEmitter(this.searchFilterEmitter);
    this.emitters = {
      loginEmitter: this.loginEmitter,
      searchFilterEmitter: this.searchFilterEmitter,
      locationsEmitter: this.locationsEmitter,
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
