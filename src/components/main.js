import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import Search from "./search";
import Login from "./login";
import UserRegister from "./user-register";
import LoginEmitter from "../models/login-emitter";
import ProviderTabs from "./provider-tabs";
import GlowTheme from "../shared/theme";
import Filter from "./filter";
import ProviderRegister from "./provider-register";
import InformAddress from "./informAddress";
import Chat from "./chat";

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
                  this.props.loginEmitter.logout();
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
            <StackNavigator {...props} loginEmitter={this.props.loginEmitter} />
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
      </this.drawer.Navigator>
    );
  }
}

class StackNavigator extends Component {
  componentKey = "stackNavigator";

  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
    this.state = {
      userLoggedIn: false,
    };
  }

  _handleLogin(value) {
    this.setState({ userLoggedIn: value });
  }

  componentDidMount() {
    this.props.loginEmitter.subscribe(
      this.componentKey,
      this._handleLogin.bind(this)
    );
  }

  componentWillUnmount() {
    this.props.loginEmitter.unsubscribe(this.componentKey);
  }

  render() {
    return (
      <this.stack.Navigator initialRouteName="glow">
        <this.stack.Screen
          name="glow"
          options={({ navigation }) => ({
            headerTitle: () => (
              <Image
                source={require("../assets/glow-logo.png")}
                style={style.image}
              />
            ),
            headerRight: () => {
              if (this.state.userLoggedIn) {
                return (
                  <TouchableOpacity
                    style={style.headerLoginButton}
                    onPress={() => navigation.toggleDrawer()}
                  >
                    <FontAwesomeIcon
                      icon={faBars}
                      onPress={() => navigation.toggleDrawer()}
                      color={"#fff"}
                    />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={style.headerLoginButton}
                    onPress={() => navigation.navigate("login")}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                );
              }
            },
          })}
        >
          {(props) => (
            <Search
              {...props}
              loginEmitter={this.props.loginEmitter}
              userLoggedIn={this.state.userLoggedIn}
            />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="login"
          options={{
            title: "Login",
          }}
        >
          {(props) => (
            <Login {...props} loginEmitter={this.props.loginEmitter} />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="user-register"
          options={{
            title: "Cadastro de usuário",
          }}
        >
          {(props) => (
            <UserRegister {...props} loginEmitter={this.props.loginEmitter} />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="provider-tabs"
          options={{
            title: "Detalhes do Profissional",
          }}
        >
          {(props) => (
            <ProviderTabs {...props} loginEmitter={this.props.loginEmitter} />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="filter"
          component={Filter}
          options={{
            title: "Filtrar Profissionais",
          }}
        />

        <this.stack.Screen
          name="chat"
          component={Chat}
          options={{
            title: "Chat",
          }}
        />

        <this.stack.Screen
          name="inform-address"
          component={InformAddress}
          options={{
            title: "Informar Endereço",
          }}
        />
      </this.stack.Navigator>
    );
  }
}

class Main extends Component {
  constructor() {
    super();
    this.loginEmitter = new LoginEmitter();
  }

  render() {
    return (
      <NavigationContainer theme={GlowTheme}>
        <DrawerNavigator loginEmitter={this.loginEmitter} />
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({
  image: {
    width: 150,
    height: 40,
  },
  headerLoginButton: {
    borderRadius: 30,
    width: 60,
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

export default Main;
