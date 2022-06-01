import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Permissions from "expo-permissions";

export default function AddPhotoCamera() {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso negado a Camera</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
    }
  }

  async function savePicture() {
    // const assert = await MEDIA_LIBRARY.createAssetAsync(capturedPhoto).then(
    //   () => {
    //     alert("Salvo com sucesso!");
    //   }
    // );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonTrocar}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Trocar </Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
        <FontAwesome name="camera" size={23} color="#FFF" />
      </TouchableOpacity>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <View style={styles.modal}>
            <View style={{ margin: 10, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => setOpen(false)}
              >
                <FontAwesome name="window-close" size={50} color="#FF0000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => savePicture()}
              >
                <FontAwesome
                  name="chevron-circle-down"
                  size={50}
                  color="#121212"
                />
              </TouchableOpacity>
            </View>
            <Image
              style={{ width: "100%", height: 450, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  buttonCamera: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
  buttonTrocar: {
    fontSize: 20,
    marginBottom: 13,
    color: "#FFF",
  },

  text: {
    fontSize: 18,
    marginBottom: 13,
    color: "white",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
