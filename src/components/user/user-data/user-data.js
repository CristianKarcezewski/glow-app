import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { getUserById, updateUser } from "../../../services/user-service";
import Toast from "react-native-root-toast";
import ImageIcon from "../../../assets/fotoPerfil.jpg";


class UserData extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUser: null,
      userId: "",
      name: "",
      email: "",
      password: "",
      passwordCurrent: "",
      confirmPassword: "",
      validName: true,
      validEmail: true,
      validPassword: true,
      validConfirmPassword: true,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.showHeader(true);
  }

  fetchUser() {
    this.setState({ ...this.state, loading: true });

    getUserById(Platform.OS, this.props.loginEmitter.userData.authorization)
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({...this.state, loading: false, name:data.name, email:data.email, userId:data.userId, passwordCurrent:data.password});
          console.log("Teste22222",this.state.passwordCurrent)
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao carregar dados da sua conta", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro ao carregar dados da sua conta", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleUpdate() {
    if (
      this.state.validName &&
      this.state.validEmail &&
      this.state.validPassword &&
      this.state.validConfirmPassword
    ) {
      this.setState({ ...this.state, loading: true });
      let refreshUser = {
        userId: this.state.userId,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };     
      
     updateUser( Platform.OS, this.props.loginEmitter.userData.authorization,
      refreshUser
    )    
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false });
          // let index = this.state.userId;
          // this.props.filterEmitter.addresses[index] = data;
          this.props.navigation.goBack();
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao atualizar usário", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro ao carregar usuário", {
          duration: Toast.durations.LONG,
        });
      });  
    }
  }
  

  componentDidMount() {
    this.fetchUser();
  }

  _handleName(value) {
    if (value) {
      this.setState({ ...this.state, name: value, validName: true });
    } else {
      this.setState({ ...this.state, name: value, validName: false });
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
          <TouchableOpacity style={style.imageContainer}>
            <Image
              style={style.imageLogo}
              source={this.state.imageUser || ImageIcon}
            />
          </TouchableOpacity>
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
              placeholder="E-mail"
              onChangeText={(value) => this._handleEmail(value)}
              value={this.state.email}
            />

            <TextInput
              style={
                this.state.validPassword
                  ? style.validFormField
                  : style.invalidFormField
              }
              secureTextEntry={true}
              placeholder="Nova Senha"
              onChangeText={(value) => this._handlePassword(value)}
              value={this.state.password || this.state.passwordCurrent}
            />
            <TextInput
              style={
                this.state.validConfirmPassword
                  ? style.validFormField
                  : style.invalidFormField
              }
              secureTextEntry={true}
              placeholder="Confirmar Senha"
              onChangeText={(value) => this._handleCheckPassword(value)}
              value={this.state.confirmPassword}
            />
            <TouchableHighlight
              style={style.registerButton}
              onPress={() => this._handleUpdate()}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
                Atualizar
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
    flex: 3,
    alignItems: "center",
    justifyContent: "center",   
    marginHorizontal: "30%",
    marginTop: 20,
    borderRadius: 15,
  },
  imageLogo: {
    margin:5,
    width: 160,
    height: 160,
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

export default UserData;
