import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import Input from "../Input";
import { login } from "../../services/auth-service";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validEmail: true,
      validPassword: true,
    };
  }

  _login() {
    if (
      this.state.validEmail &&
      this.state.validPassword &&
      this.state.email != "" &&
      this.state != ""
    ) {
      login(Platform.OS, this.state.email, this.state.password)
        .then(({ status, data }) => {
          if (status === 200) {
            this.props.emitters.loginEmitter.login(data.authorization);
            this.props.navigation.popToTop();
          }
        })
        .catch((err) => console.log("error", err));
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={style.imageContainer}>
          <Image
            style={style.imageLogo}
            source={require("../../assets/glow-logo.png")}
          />
        </View>

        <View style={style.container}>
          <Input
            style={
              this.state.validEmail
                ? style.validEmailField
                : style.invalidEmailField
            }
            maxLength={50}
            placeholder="Email"
            pattern={"/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/"}
            onValidation={(isValid) => {
              this.setState({ ...this.state, validEmail: isValid });
            }}
            onChangeText={(value) => {
              this.setState({ ...this.state, email: value });
            }}
            value={this.state.email}
          />

          <Input
            placeholder="Password"
            secureTextEntry={true}
            style={style.passwordField}
            onChangeText={(value) => {
              this.setState({ ...this.state, password: value });
            }}
            value={this.state.password}
          />

          <TouchableOpacity
            style={style.loginButton}
            onPress={() => this._login()}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.registerButton}
            onPress={() => this.props.navigation.navigate("user-register")}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Registre-se
            </Text>
          </TouchableOpacity>

          <Text style={style.forgotPassword}>Esqueci minha senha</Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    marginTop: 70,
    width: 180,
    height: 50,
  },
  container: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  validEmailField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },
  invalidEmailField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "#db382f",
    borderWidth: 2,
    borderRadius: 15,
  },
  passwordField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },
  loginButton: {
    borderRadius: 15,
    width: "50%",
    margin: 10,
    padding: 2,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
  },
  registerButton: {
    borderRadius: 15,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
    padding: 2,
  },
  forgotPassword: {
    color: "blue",
    fontSize: 18,
    margin: 10,
    textDecorationLine: "underline",
  },
});
export default Login;
