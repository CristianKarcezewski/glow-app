import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gallery from "../../gallery";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faPhotoVideo,
} from "@fortawesome/free-solid-svg-icons";
import AddPhotoCamera from "../../add-photo-camera";
import AddPhotoGallery from "../../add-photo-gallery";

class ProviderGalleryStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }

  render() {
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
                onPress={() => navigation.navigate("add-photo-camera")}
              >
                <FontAwesomeIcon icon={faPlus} color={"#fff"} size={20} />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => <Gallery {...props} />}
        </this.stack.Screen>

        <this.stack.Screen
          name="add-photo-camera"
          options={({ navigation }) => ({
            title: "Galeria",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerLoginButton}
                onPress={() => navigation.navigate("add-photo-gallery")}
              >
                <FontAwesomeIcon icon={faPhotoVideo} color={"#fff"} size={20} />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => <AddPhotoCamera {...props} />}
        </this.stack.Screen>
        <this.stack.Screen
          name="add-photo-gallery"
          options={{
            title: "Adicionar Foto Galeria",
            headerShown: true,
          }}
        >
          {(props) => <AddPhotoGallery {...props} />}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
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
