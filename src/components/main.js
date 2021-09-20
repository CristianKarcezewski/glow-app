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
    this.state = {
      loginEmitter: new LoginEmitter(),
      searchFilterEmitter: new SearchFilterEmitter(),
      addressesFilterEmitter: new AddressEmitter(),
      locationsEmitter: new LocationsEmitter(),
    };
  }

  _cleanMemory() {
    this.state.loginEmitter.reset();
    this.state.searchFilterEmitter.reset();
    this.state.addressesFilterEmitter.reset();
    this.state.locationsEmitter.reset();
  }

  render() {
    return (
      <NavigationContainer theme={GlowTheme}>
        <DrawerNavigator
          loginEmitter={this.state.loginEmitter}
          searchFilterEmitter={this.state.searchFilterEmitter}
          addressesFilterEmitter={this.state.addressesFilterEmitter}
          locationsEmitter={this.state.locationsEmitter}
          cleanMemory={this._cleanMemory.bind(this)}
        />
      </NavigationContainer>
    );
  }
}

export default Main;
