import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gallery from "../../../gallery";
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";
import { setCompanyImage } from "./../../../../services/file-service";
import uuid from "react-native-uuid";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../config/firebase-config";
import Toast from "react-native-root-toast";

class ProviderGalleryStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
    this.state = {
      image: null,
    };
  }

  updateImage(image) {
    this.setState({ ...this.state, image });
  }

  pickImage() {
    Alert.alert(
      "Adicionar Imagem",
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
      quality: 1,
      // base64: true,
    }).then((result) => {
      this.uploadImage(result);
    });
  }

  pickFromCam() {
    ImagePicker.requestCameraPermissionsAsync().then((permission) => {
      if (permission.granted === true) {
        ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          // base64: true,
        }).then((result) => this.uploadImage(result));
      }
    });
  }

  uploadImage(file) {
    if (file) {
      try {
        this.setState({ ...this.state, loading: true });

        if (!file.cancelled) {
          this.uploadImageAsync(file.uri).then((uploadUrl) => {
            this.saveImageUrl(uploadUrl);
          });
        } else {
          this.setState({ loading: false });
        }
      } catch (e) {
        console.log(e);
        this.setState({ loading: false });
      }
    }
  }

  saveImageUrl(url) {
    if (url) {
      setCompanyImage(
        Platform.OS,
        this.props.loginEmitter?.userData?.authorization,
        this.props.providerEmitter.selectedProvider,
        url
      )
        .then(({ status, data }) => {
          if (status === 200) {
            this.setState({
              ...this.state,
              loading: false,
            });
          } else {
            this.setState({ ...this.state, loading: false });
            Toast.show("Erro ao fazer upload do arquivo", {
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

  async uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(
      storage,
      `glow-files/${this.props.loginEmitter?.userData?.uid}/${uuid.v4()}`
    );
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
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
        <this.stack.Navigator initialRouteName="gallery">
          <this.stack.Screen
            name="gallery"
            options={({ navigation }) => ({
              title: "Menu",
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => navigation.goBack()}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={20}
                    style={{ flex: 1 }}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={styles.headerLoginButton}
                  onPress={() => this.pickImage()}
                >
                  <FontAwesomeIcon icon={faPlus} color={"#fff"} size={20} />
                </TouchableOpacity>
              ),
            })}
          >
            {(props) => (
              <Gallery
                {...props}
                providerEmitter={this.props.providerEmiter}
                loginEmitter={this.props.loginEmitter}
              />
            )}
          </this.stack.Screen>
        </this.stack.Navigator>
      );
    }
  }
}

const styles = StyleSheet.create({
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

export default ProviderGalleryStack;
