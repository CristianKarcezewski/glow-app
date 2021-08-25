import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { login } from "../../services/auth-service";
import Toast from "react-native-root-toast";

class Login extends Component {
  emailPattern =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  passwordPattern =
    /^([@#](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$/;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validEmail: true,
      validPassword: true,
      loading: false,
    };
  }

  _handleLogin() {
    if (
      this.state.validEmail &&
      this.state.validPassword &&
      this.state.email != ""
    ) {
      this.setState({ ...this.state, loading: true });
      login(Platform.OS, this.state.email, this.state.password)
        .then(({ status, data }) => {
          if (status === 200) {
            this.props.emitters.loginEmitter.login(data.authorization);
            this.setState({ ...this.state, loading: false });
            this.props.navigation.popToTop();
          } else {
            this.setState({ ...this.state, loading: false });
            Toast.show("Usuário ou senha inválidos...", {
              duration: Toast.durations.LONG,
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          this.setState({ ...this.state, loading: false });
        });
    } else {
      if (this.state.email != "" || this.state.password != "") {
        Toast.show("Dados inválidos", {
          duration: Toast.durations.SHORT,
        });
      } else {
        Toast.show("Preencha os campos.", {
          duration: Toast.durations.SHORT,
        });
      }
    }
  }

  _handleEmail(value) {
    if (this.emailPattern.test(value.toLowerCase()) === true) {
      this.setState({
        ...this.state,
        validEmail: true,
        email: value.toLowerCase(),
      });
    } else {
      this.setState({ ...this.state, validEmail: false, email: value });
    }
  }

  _handlePassword(value) {
    if (this.state.password.length >= 6) {
      this.setState({ ...this.state, validPassword: true, password: value });
    } else {
      this.setState({ ...this.state, validPassword: false, password: value });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size={"large"}
          color={"#db382f"}
          animating={this.state.laoding}
          style={{ flex: 1 }}
        />
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={style.imageContainer}>
            <Image
              style={style.imageLogo}
              source={require("../../assets/glow-logo.png")}
            />
          </View>

          <View style={style.container}>
            <TextInput
              style={
                this.state.validEmail
                  ? style.validEmailField
                  : style.invalidEmailField
              }
              maxLength={50}
              placeholder="Email"
              onChangeText={(value) => this._handleEmail(value)}
              value={this.state.email}
            />

            <TextInput
              placeholder="Senha"
              secureTextEntry={true}
              style={
                this.state.validPassword
                  ? style.validPasswordField
                  : style.invalidPasswordField
              }
              onChangeText={(value) => this._handlePassword(value)}
              value={this.state.password}
            />

            <TouchableOpacity
              style={style.loginButton}
              onPress={() => this._handleLogin()}
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
  validPasswordField: {
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
  invalidPasswordField: {
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
