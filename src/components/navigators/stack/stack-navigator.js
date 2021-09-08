import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Search from "../../search";
import Login from "../../auth/login";
import UserRegister from "../../auth/user-register";
import ProviderDetailTabs from "../../provider/provider-detail-tabs";
import ProviderFilter from "../../provider-filter";

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
    this.setState({ ...this.state, userLoggedIn: value });
  }

  componentDidMount() {
    this.props.emitters.loginEmitter.subscribe(
      this.componentKey,
      this._handleLogin.bind(this)
    );
  }

  componentWillUnmount() {
    this.props.emitters.loginEmitter.unsubscribe(this.componentKey);
  }

  render() {
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
              emitters={this.props.emitters}
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
          {(props) => <Login {...props} emitters={this.props.emitters} />}
        </this.stack.Screen>

        <this.stack.Screen
          name="user-register"
          options={{
            title: "Cadastro de usuário",
          }}
        >
          {(props) => (
            <UserRegister {...props} emitters={this.props.emitters} />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="provider-detail-tabs"
          options={{
            title: "Detalhes do Profissional",
          }}
        >
          {(props) => (
            <ProviderDetailTabs {...props} emitters={this.props.emitters} />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="provider-filter"
          options={{
            title: "Filtrar Profissionais",
          }}
        >
          {(props) => (
            <ProviderFilter {...props} emitters={this.props.emitters} />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
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
