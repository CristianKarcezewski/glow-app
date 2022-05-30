import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StackNavigator from "../stack";
import UserTabs from "../../user/user-tabs";
import ProviderRegisterTabs from "../../provider/provider-register-tabs";
import ServicePacks from "../../service-packs/service-packs";

class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.drawer = createDrawerNavigator();
  }

  _clean({ navigation }) {
    console.log("CLEAR");
    this.props.loginEmitter.logout();
    this.props.cleanMemory();
    navigation.closeDrawer();
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
              this.props.loginEmitter.userLoggedIn == 2
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
    
        {this.props.loginEmitter.userLoggedIn ==2 ? (
          <this.drawer.Screen
            name="service-packs"
            component={ServicePacks}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Pacotes de Serviço",
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
        ) : null}
      </this.drawer.Navigator>
    );
  }
}

export default DrawerNavigator;
