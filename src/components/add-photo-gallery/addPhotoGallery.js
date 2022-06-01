import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import commonStyles from "../../shared/commonStyles";

export default function AddPhotoGallery() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    pickImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {pickImage}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: "90%", height: "80%", marginTop: 10 }}
        />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderRadius: 20,
          width: "50%",
          maxHeight: 45,
          padding: 5,
          marginBottom: 10,
          justifyContent: "space-around",
        }}
      >
        <Button title="Excluir" onPress={pickImage} />
        <Button title="Salvar" onPress={pickImage} />
      </View>
    </View>
  );
}
