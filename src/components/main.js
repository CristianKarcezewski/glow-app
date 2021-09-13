import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginEmitter from "../emitters/login-emitter";
import LocationsEmitter from "../emitters/locations-emitter";
import SearchFilterEmitter from "../emitters/search-filter-emitter";
import GlowTheme from "../shared/theme";
import DrawerNavigator from "./navigators/drawer";
import AddressEmitter from "../emitters/addresses-emitter";

class Main extends Component {
  constructor() {
    super();
    this.loginEmitter = new LoginEmitter();
    this.searchFilterEmitter = new SearchFilterEmitter();
    this.addressesFilterEmitter = new AddressEmitter();
    this.locationsEmitter = new LocationsEmitter(
      this.searchFilterEmitter,
      this.addressesFilterEmitter
    );
  }

  render() {
    return (
      <NavigationContainer theme={GlowTheme}>
        <DrawerNavigator
          loginEmitter={this.loginEmitter}
          searchFilterEmitter={this.searchFilterEmitter}
          addressesFilterEmitter={this.addressesFilterEmitter}
          locationsEmitter={this.locationsEmitter}
        />
      </NavigationContainer>
    );
  }
}

export default Main;
