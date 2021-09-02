import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProviderRegister from "../../provider/provider-register";
import Schedule from "../../schedule";
import ServicePacks from "../../service-packs";
import AddressList from "../../addresses/address-list";
import StackNavigator from "../stack";

class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.drawer = createDrawerNavigator();
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
              <DrawerItem
                label="Sair"
                onPress={() => {
                  this.props.emitters.loginEmitter.logout();
                  props.navigation.goBack();
                }}
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <this.drawer.Screen
          name="root"
          options={{ headerShown: false, title: "Início" }}
        >
          {(props) => (
            <StackNavigator {...props} emitters={this.props.emitters} />
          )}
        </this.drawer.Screen>

        <this.drawer.Screen
          name="provider-register"
          component={ProviderRegister}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Torne-se um prestador",
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
        <this.drawer.Screen
          name="address-list"
          options={({ navigation }) => ({
            headerShown: true,
            title: "Meus Endereços",
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
            headerRight: () => (
              <TouchableOpacity
                style={style.headerLoginButton}
                onPress={() => navigation.navigate("manual-address")}
              >
                <FontAwesomeIcon icon={faPlus} color={"#fff"} size={20} />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => <AddressList {...props} emitters={this.props.emitters} />}
        </this.drawer.Screen>
      </this.drawer.Navigator>
    );
  }
}

const style = StyleSheet.create({
  // image: {
  //   width: 150,
  //   height: 40,
  // },
  headerLoginButton: {
    borderRadius: 10,
    padding: 3,
    width: 70,
    height: 30,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
    justifyContent: "center",
    elevation: 20,
  },
});

export default DrawerNavigator;
