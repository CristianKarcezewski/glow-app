import React, { Component } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import StackNavigator from "../stack";
import UserTabs from "../../user/user-tabs";
import ProviderRegisterTabs from "../../provider/provider-register-tabs";
import ProviderPackagesStack from "../../provider/provider-packages-stack/provider-packages-stack";

class DrawerNavigator extends Component {
  drawerMenuKey = "drawerMenuKey";
  constructor(props) {
    super(props);
    this.drawer = createDrawerNavigator();
    this.state = {};
  }

  _clean({ navigation }) {
    console.log("CLEAR");
    this.props.loginEmitter.logout();
    this.props.cleanMemory();
    navigation.closeDrawer();
  }

  refreshMenu() {
    this.setState({ ...this.state });
  }

  componentDidMount() {
    this.props.loginEmitter.subscribe(
      this.drawerMenuKey,
      this.refreshMenu.bind(this)
    );
  }

  componentWillUnmount() {
    this.props.loginEmitter.unsubscribe(this.drawerMenuKey);
  }

  render() {
    return (
      <this.drawer.Navigator
        initialRouteName="root"
        screenOptions={{
          drawerPosition: "right",
          headerShown: false,
          swipeEnabled: false,
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Sair" onPress={() => this._clean(props)} />
            </DrawerContentScrollView>
          );
        }}
      >
        <this.drawer.Screen
          name="root"
          options={{ headerShown: false, title: "Início" }}
        >
          {(props) => (
            <StackNavigator
              {...props}
              loginEmitter={this.props.loginEmitter}
              searchFilterEmitter={this.props.searchFilterEmitter}
              addressesFilterEmitter={this.props.addressesFilterEmitter}
              // locationsEmitter={this.props.locationsEmitter}
            />
          )}
        </this.drawer.Screen>

        <this.drawer.Screen
          name="user-details"
          options={() => ({
            headerShown: false,
            title: "Minha conta",
          })}
        >
          {(props) => (
            <UserTabs
              {...props}
              loginEmitter={this.props.loginEmitter}
              // locationsEmitter={this.props.locationsEmitter}
              addressesFilterEmitter={this.props.addressesFilterEmitter}
            />
          )}
        </this.drawer.Screen>

        <this.drawer.Screen
          name="provider-register-tabs"
          options={({ navigation }) => ({
            headerShown: false,
            title:
              this.props.loginEmitter?.userData?.userGroupId === 2
                ? "Meus serviços"
                : "Ser um prestador",
          })}
        >
          {(props) => (
            <ProviderRegisterTabs
              {...props}
              loginEmitter={this.props.loginEmitter}
              providerRegisterEmitter={this.props.providerRegisterEmitter}
              addressesProviderFilterEmitter={
                this.props.addressesProviderFilterEmitter
              }
            />
          )}
        </this.drawer.Screen>

        {this.props.loginEmitter?.userData?.userGroupId === 2 ? (
          <this.drawer.Screen
            name="provider-packages-stack"
            options={{ headerShown: false, title: "Pacotes" }}
          >
            {(props) => (
              <ProviderPackagesStack
                {...props}
                loginEmitter={this.props.loginEmitter}
              />
            )}
          </this.drawer.Screen>
        ) : null}
      </this.drawer.Navigator>
    );
  }
}

export default DrawerNavigator;
