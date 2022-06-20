import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Search from "../../search";
import Login from "../../auth/login";
import UserRegister from "../../auth/user-register";
import ProviderDetailTabs from "../../provider/provider-detail-tabs";
import ProviderFilterStack from "../../provider-filter";

class StackNavigator extends Component {
  componentKey = "stackNavigator";

  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
    this.state = {
      userLoggedIn: false,
      headerShown: true,
    };
  }

  getUserLogged() {
    return this.props.loginEmitter?.userData == null ? false : true;
  }

  _handleLogin() {
    if (this.props.loginEmitter?.userData) {
      this.setState({ ...this.state, userLoggedIn: true });
    } else {
      this.setState({ ...this.state, userLoggedIn: false });
    }
  }

  setHeader(value) {
    this.setState({ ...this.state, headerShown: value });
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
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size={"large"}
          color={"#db382f"}
          animating={!this.state.headerShown}
          style={{ flex: 1 }}
        />
      );
    } else {
      return (
        <this.stack.Navigator initialRouteName="glow">
          <this.stack.Screen
            name="glow"
            options={({ navigation }) => ({
              headerTitle: () => (
                <Image
                  source={require("../../../assets/glow-logo.png")}
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
                          height: 30,
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
                searchFilterEmitter={this.props.searchFilterEmitter}
              />
            )}
          </this.stack.Screen>

          <this.stack.Screen
            name="login"
            options={{
              title: "Login",
              headerShown: this.state.headerShown,
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
              headerShown: this.state.headerShown,
            }}
          >
            {(props) => (
              <UserRegister {...props} loginEmitter={this.props.loginEmitter} />
            )}
          </this.stack.Screen>

          <this.stack.Screen
            name="provider-detail-tabs"
            options={{
              title: "Detalhes do Profissional",
              headerShown: this.state.headerShown,
            }}
          >
            {(props) => (
              <ProviderDetailTabs
                {...props}
                getUserInfo={this.getUserInfo.bind(this)}
                loginEmitter={this.props.loginEmitter}
                getUserLogged={this.getUserLogged.bind(this)}
              />
            )}
          </this.stack.Screen>

          <this.stack.Screen
            name="provider-filter-stack"
            options={{
              title: "Filtrar Profissionais",
              headerShown: this.state.headerShown,
            }}
          >
            {(props) => (
              <ProviderFilterStack
                {...props}
                // locationsEmitter={this.props.locationsEmitter}
                searchFilterEmitter={this.props.searchFilterEmitter}
                toggleHeader={this.setHeader.bind(this)}
              />
            )}
          </this.stack.Screen>
        </this.stack.Navigator>
      );
    }
  }
}

const style = StyleSheet.create({
  image: {
    width: 150,
    height: 40,
  },
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

export default StackNavigator;
