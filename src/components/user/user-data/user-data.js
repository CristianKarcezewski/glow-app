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
  Alert,
} from "react-native";
import { getUserById, updateUser } from "../../../services/user-service";
import Toast from "react-native-root-toast";
import ImageIcon from "../../../assets/fotoPerfil.jpg";
import AddPhotoCamera from "../../add-photo-camera";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: { uri: "https://i.pravatar.cc/150?img=32" },
      name: "",
      email: "",
      validName: true,
      validEmail: true,
    };
  }

  fetchUser() {
    this.setState({ ...this.state, loading: true });
    getUserById(Platform.OS, this.props.loginEmitter.userData.authorization)
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({
            ...this.state,
            loading: false,
            name: data.name,
            email: data.email,
          });
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
    if (this.state.validName && this.state.validEmail) {
      this.setState({ ...this.state, loading: true });
      let refreshUser = {
        userName: this.state.name,
        email: this.state.email,
      };

      updateUser(
        Platform.OS,
        this.props.loginEmitter.userData.authorization,
        refreshUser
      )
        .then(({ status, data }) => {
          if (status === 200) {
            this.setState({
              ...this.state,
              loading: false,
              name: data.name,
              email: data.email,
            });
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
  confirmUserUpdate() {
    Alert.alert(
      "Atualizar Usuário",
      "Tem certeza que deseja atualizar os dados da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "OK", onPress: () => this._handleUpdate() },
      ],
      { cancelable: false }
    );
  }
  getImage() {
    return (
       console.log("oi")      
    );
  }

  componentWillUnmount() {
    this.props.showHeader(false);
  }

  componentDidMount() {
    this.props.showHeader(true);
    this.fetchUser();
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
              onPress={() => this.getImage()}
              source={this.state.imageUrl || ImageIcon}
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
              onChangeText={(value) =>
                this.setState({
                  ...this.state,
                  name: value,
                  validName: value.length > 0 ? true : false,
                })
              }
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
            <TouchableHighlight
              style={style.registerButton}
              onPress={() => this.confirmUserUpdate()}
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
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "30%",
    marginTop: 20,
    borderRadius: 15,
  },
  imageLogo: {
    margin: 5,
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  container: {
    flex: 5,
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
