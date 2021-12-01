import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageElement from "./imageElement";

export default class Gallery extends Component {
  state = {
    modalVisible: false,
    modalImage: require("../../assets/imagem1.jpg"),
    images: [
      require("../../assets/imagem8.jpg"),
      require("../../assets/imagem7.jpg"),
      require("../../assets/imagem6.jpg"),
      require("../../assets/imagem5.jpg"),
      require("../../assets/imagem4.jpg"),
      require("../../assets/imagem3.jpg"),
      require("../../assets/imagem2.jpg"),
      require("../../assets/imagem1.jpg"),
      require("../../assets/imagem9.png"),
    ],
  };
  setModalVisible(visible, imageKey) {
    this.setState({ modalImage: this.state.images[imageKey] });
    this.setState({ modalVisible: visible });
  }
  getImage() {
    return this.state.modalImage;
  }
  render() {
    let images = this.state.images.map((val, id) => {
      return (
        <TouchableWithoutFeedback
          key={id}
          onPress={() => {
            this.setModalVisible(true, id);
          }}
        >
          <View style={styles.imagewrap}>
            <ImageElement
              style={{ width: "200%", height: "100%" }}
              imagsource={val}
            ></ImageElement>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    //  let images = this.state.images.map((item) => {
    //    return (
    //      <SafeAreaView
    //        style={{
    //          flex: 1,
    //          alignItems: "center",
    //          justifyContent: "space-between",
    //        }}
    //      >
    //        <FlatList
    //          data={this.state.images}
    //          keyExtractor={(item) => item.id.toString()}
    //          renderItem={({ item }) => (
    //            <TouchableWithoutFeedback
    //
    //              onPress={() => {
    //                this.setModalVisible(true, item);
    //              }}
    //            >
    //              <ImageElement imagsource={item}></ImageElement>
    //            </TouchableWithoutFeedback>
    //          )}
    //        />
    //      </SafeAreaView>
    //    );
    //  });

    return (
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.modal}>
            <Text
              style={styles.text}
              onPress={() => {
                this.setModalVisible(false);
              }}
            >
              Fechar
            </Text>
            <ImageElement imagsource={this.state.modalImage}></ImageElement>
          </View>
        </Modal>
        {images}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#eee",
  },
  imagewrap: {
    margin: 2,
    padding: 2,
    height: Dimensions.get("window").height / 3 - 12,
    width: Dimensions.get("window").width / 2 - 4,
    backgroundColor: "#fff",
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: "rgba(0,0,0, 0.9)",
  },
  text: {
    color: "#fff",
  },
});

AppRegistry.registerComponent("Gallery", () => Gallery);
