import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { register } from "../../../services/auth-service";
import Toast from "react-native-root-toast";
import { auth } from "../../../config/firebase-config";
import { signInWithCustomToken } from "firebase/auth";

class UserRegister extends Component {
  emailPattern =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  passwordPattern =
    /^([@#](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$/;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      validName: false,
      validEmail: false,
      validPassword: false,
      validConfirmPassword: false,
      loading: false,
    };
  }

  _handleRegister() {
    if (
      this.state.validName &&
      this.state.validEmail &&
      this.state.validPassword &&
      this.state.validConfirmPassword
    ) {
      this.setState({ ...this.state, loading: true });
      this.props.loginEmitter.reset();
      let newUser = {
        userName: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      register(Platform.OS, newUser)
        .then(({ status, data }) => {
          if (status === 200) {
            signInWithCustomToken(auth, data.authorization)
              .then((userCredential) => {
                // Signed in
                userCredential.user.getIdToken().then((idToken) => {
                  console.log(data);
                  data.authorization = idToken;
                  console.log(data)
                  this.props.loginEmitter.login(data);
                });
                this.setState({ ...this.state, loading: false });
                this.props.navigation.popToTop();
              })
              .catch((error) => {
                console.log("error", error);
                this.setState({ ...this.state, loading: false });
              });
          } else {
            this.setState({ ...this.state, loading: false });
            Toast.show("Erro ao cadastrar usuário", {
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
        Toast.show("Preencha todos os campos.", {
          duration: Toast.durations.SHORT,
        });
      }
    }
  }

  _handleName(value) {
    if (value) {
      this.setState({ ...this.state, name: value.trim(), validName: true });
    } else {
      this.setState({ ...this.state, name: value, validName: false });
    }
  }

  _handleEmail(value) {
    if (value) {
      value = value.trim();
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
  }

  _handlePassword(value) {
    if (this.state.password.length >= 6) {
      this.setState({ ...this.state, validPassword: true, password: value });
    } else {
      this.setState({ ...this.state, validPassword: false, password: value });
    }
  }

  _handleCheckPassword(value) {
    if (
      this.state.confirmPassword.length >= 6 &&
      this.state.password === value
    ) {
      this.setState({
        ...this.state,
        validConfirmPassword: true,
        confirmPassword: value,
      });
    } else {
      this.setState({
        ...this.state,
        validConfirmPassword: false,
        confirmPassword: value,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size={"large"}
          color={"#db382f"}
          animating={this.state.loading}
          style={{ flex: 1 }}
        />
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={style.imageContainer}>
            <Image
              style={style.imageLogo}
              source={require("../../../assets/glow-logo.png")}
            />
          </View>
          <View style={style.container}>
            <TextInput
              style={
                this.state.validName
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              placeholder="Nome"
              onChangeText={(value) => this._handleName(value)}
              value={this.state.name}
            />
            <TextInput
              style={
                this.state.validEmail
                  ? style.validFormField
                  : style.invalidFormField
              }
              maxLength={50}
              keyboardType={"email-address"}
              autoCapitalize="none"
              placeholder="E-mail"
              onChangeText={(value) => this._handleEmail(value)}
              value={this.state.email}
            />
            {/* <TextInput
            style={style.formField}
            type="telefone"
            placeholder="Tefefone"
          /> */}

            {/* <View style={style.pickerView}>
            <Picker
              style={style.picker}
              selectedValue={this.state.selectedState}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ ...this.state, selectedState: itemIndex })
              }
            >
              <Picker.Item
                label={"Selecione seu estado"}
                value={null}
                key={""}
              />
              {this.props.locationsEmitter
                .getAllStates()
                .map((st, index) => {
                  return (
                    <Picker.Item label={st.name} value={st.uf} key={index} />
                  );
                })}
            </Picker>
          </View>

          <View style={style.pickerView}>
            <Picker
              style={style.picker}
              selectedValue={this.state.selectedCity}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ ...this.state, selectedCity: itemIndex })
              }
            >
              <Picker.Item
                label={"Selecione sua cidade"}
                value={null}
                key={""}
              />
              {this.props.locationsEmitter
                .getStateByIndex(this.state.selectedState)
                ?.cities.map((city, index) => {
                  return <Picker.Item label={city} value={city} key={index} />;
                })}
            </Picker>
          </View> */}

            <TextInput
              style={
                this.state.validPassword
                  ? style.validFormField
                  : style.invalidFormField
              }
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="Senha"
              onChangeText={(value) => this._handlePassword(value)}
              value={this.state.password}
            />
            <TextInput
              style={
                this.state.validConfirmPassword
                  ? style.validFormField
                  : style.invalidFormField
              }
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="Confirmar Senha"
              onChangeText={(value) => this._handleCheckPassword(value)}
              value={this.state.confirmPassword}
            />
            <TouchableHighlight
              style={style.registerButton}
              onPress={() => this._handleRegister()}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
                Cadastrar
              </Text>
            </TouchableHighlight>
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
    width: 150,
    height: 40,
  },
  container: {
    flex: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  validFormField: {
    width: "80%",
    paddingHorizontal: 20,
    margin: 5,
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
  invalidFormField: {
    width: "80%",
    paddingHorizontal: 20,
    margin: 5,
    fontSize: 18,
    borderColor: "#db382f",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
  pickerView: {
    width: "80%",
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    borderRadius: 15,
    height: 40,
  },
  picker: {
    margin: 5,
  },
  registerButton: {
    borderRadius: 15,
    width: "50%",
    margin: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
  },
});
export default UserRegister;
