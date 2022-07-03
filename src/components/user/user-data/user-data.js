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
import { setProfileImage } from "../../../services/file-service";
import Toast from "react-native-root-toast";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUserAlt,
  faPenToSquare,
  faPenSquare,
  faPen,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";

class UserData extends Component {
  userDataKey = "userDataKey";
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: "",
      name: "",
      email: "",
      validName: true,
      validEmail: true,
      formChanged: false,
    };
  }

  // fetchUser() {
  //   this.setState({ ...this.state, loading: true });
  //   getUserById(Platform.OS, this.props.loginEmitter.authorization)
  //     .then(({ status, data }) => {
  //       if (status === 200) {

  //       } else {
  //         this.setState({ ...this.state, loading: false });
  //         Toast.show("Erro ao carregar dados da sua conta", {
  //           duration: Toast.durations.LONG,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //       this.setState({ ...this.state, loading: false });
  //       Toast.show("Erro ao carregar dados da sua conta", {
  //         duration: Toast.durations.LONG,
  //       });
  //     });
  // }

  setUserForm() {
    this.setState({
      ...this.state,
      name: this.props.loginEmitter?.userData?.name || "",
      email: this.props.loginEmitter?.userData?.email || "",
      imageUrl: this.props.loginEmitter?.userData?.imageUrl || "",
      formChanged: false,
    });
  }

  _handleUpdate() {
    if (
      this.state.validName &&
      this.state.validEmail &&
      this.props.loginEmitter?.userData?.authorization
    ) {
      this.setState({ ...this.state, loading: true });
      let refreshUser = {
        userName: this.state.name,
        email: this.state.email,
      };

      updateUser(
        Platform.OS,
        this.props.loginEmitter?.userData?.authorization,
        refreshUser
      )
        .then(({ status, data }) => {
          if (status === 200) {
            this.setState({
              ...this.state,
              loading: false,
            });
            this.props.loginEmitter.login({
              ...data,
              authorization: this.props.loginEmitter?.userData?.authorization,
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
    if (value) {
      value = value.trim();
      if (this.emailPattern.test(value.toLowerCase()) === true) {
        this.setState({
          ...this.state,
          validEmail: true,
          email: value.toLowerCase(),
          formChanged: true,
        });
      } else {
        this.setState({ ...this.state, validEmail: false, email: value });
      }
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

  pickImage() {
    Alert.alert(
      "Imagem de perfil",
      "Selecione a origem",
      [
        {
          text: "Camera",
          style: "default",
          onPress: () => this.pickFromCam(),
        },
        {
          text: "Galeria",
          style: "default",
          onPress: () => this.pickFromGalery(),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }

  pickFromGalery() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    }).then((result) => {
      console.log(result);
      this.uploadImage(result.base64);
    });
  }

  pickFromCam() {
    ImagePicker.requestCameraPermissionsAsync().then((permission) => {
      if (permission.granted === true) {
        ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          base64: true,
        }).then((result) => this.uploadImage(result.base64));
      }
    });
  }

  uploadImage(base64) {
    if (base64) {
      this.setState({ ...this.state, loading: true });
      setProfileImage(
        Platform.OS,
        this.props.loginEmitter?.userData?.authorization,
        base64
      )
        .then(({ status, data }) => {
          if (status === 200) {
            this.setState({
              ...this.state,
              loading: false,
              imageUrl: data,
            });
          } else {
            this.setState({ ...this.state, loading: false });
            Toast.show("Erro ao salvar imagem", {
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

  componentWillUnmount() {
    this.props.showHeader(false);
    this.props.loginEmitter.unsubscribe(this.userDataKey);
  }

  componentDidMount() {
    this.props.showHeader(true);
    this.props.loginEmitter.subscribe(
      this.userDataKey,
      this.setUserForm.bind(this)
    );
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
          <TouchableOpacity
            style={style.imageContainer}
            onPress={() => this.pickImage()}
          >
            <FontAwesomeIcon
              size={25}
              icon={faPen}
              color={"#db382f"}
              style={{marginLeft:85}}
            />
            {this.state.imageUrl ? (
              <Image
                style={style.imageLogo}
                source={{ uri: this.state.imageUrl }}
              />
            ) : (
              <FontAwesomeIcon size={100} icon={faUserAlt} />
            )}
            {/* <FontAwesomeIcon
              size={25}
              icon={faPen}
              color={"#db382f"}
              // style={{marginLeft:55}}
            /> */}
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
                  formChanged: true,
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
            {this.state.formChanged ? (
              <TouchableHighlight
                style={style.registerButton}
                onPress={() => this.confirmUserUpdate()}
              >
                <Text
                  style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}
                >
                  Atualizar
                </Text>
              </TouchableHighlight>
            ) : null}
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
