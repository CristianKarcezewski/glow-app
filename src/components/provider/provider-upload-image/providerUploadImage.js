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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faPhotoVideo,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

class ProviderUploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      //imageUrl: { uri: "https://i.pravatar.cc/150?img=32" },
      imageUrl: {},
      name: "",
      email: "",
      validName: true,
      validEmail: true,
    };
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
  getImageCamera() {
    return 
  }

  componentWillUnmount() {
    // this.props.showHeader(false);
  }

  // componentDidMount() {
  //   this.props.showHeader(true);
  //   this.fetchUser();
  // }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imageContainer} source={this.state.imageUrl} />
        <View style={styles.container}>
          <TouchableOpacity style={styles.registerButton}>
            <FontAwesomeIcon icon={faCamera} color={"#fff"} size={20} />
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
              onPress={() =>
                this.props.navigation.navigate("add-photo-camera")
              }
            >
              Camera Celular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton} 
          >
            <FontAwesomeIcon icon={faPhotoVideo} color={"#fff"} size={20} />
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
              onPress={() =>
                this.props.navigation.navigate("add-photo-gallery")
              }
            >
              Galeria Celular
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    flex: 2,
    width: "95%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 20,
  },

  imageLogo: {
    margin: 5,
    width: 160,
    height: 160,
    borderRadius: 100,
  },

  registerButton: {
    borderRadius: 15,
    width: "100%",
    padding: 10,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
  },
});

export default ProviderUploadImage;
