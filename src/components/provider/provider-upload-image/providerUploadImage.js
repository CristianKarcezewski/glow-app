import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import ImageIcon from "../../../assets/fotoPerfil.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPhotoVideo,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

export default function ProviderUploadImage(props) {
  useEffect(() => {
    console.log(props.capturedPhoto);
  });

  async function savePicture() {
    console.log(props.capturedPhoto);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.registerButton}>
          <FontAwesomeIcon icon={faCamera} color={"#fff"} size={20} />
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
            onPress={() => props.navigation.navigate("add-photo-camera")}
          >
            Camera Celular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <FontAwesomeIcon icon={faPhotoVideo} color={"#fff"} size={20} />
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
            onPress={() => props.navigation.navigate("add-photo-gallery")}
          >
            Galeria Celular
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
