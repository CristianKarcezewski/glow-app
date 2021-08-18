import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Input from "../Input";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validEmail: true,
      validPassword: true,
    };
  }

  _login() {
    this.props.loginEmitter.login("Bearer dsgpsogspog");
    this.props.navigation.popToTop();
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
          />

          <Input
            placeholder="Password"
            secureTextEntry={true}
            style={style.passwordField}
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
    margin: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
  },
  invalidEmailField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 20,
  },
  passwordField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
  },
  loginButton: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
  },
  registerButton: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
  },
  forgotPassword: {
    color: "blue",
    fontSize: 20,
    margin: 10,
    textDecorationLine: "underline",
  },
});
export default Login;
