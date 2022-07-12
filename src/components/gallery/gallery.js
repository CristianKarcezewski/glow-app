import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadCompanyImages } from "./../../services/file-service";
import ImageElement from "./imageElement";
import Toast from "react-native-root-toast";

const numColumns = 2;

class Gallery extends Component {
  componentKey = "providerGalleryKey";
  state = {
    modalVisible: false,
    modalImage: null,
    images: [],
  };

  openImage(img) {
    this.setState({ ...this.state, modalVisible: true, modalImage: img });
  }

  setModalVisible(visible, imageKey) {
    this.setState({
      modalImage: this.state.images[imageKey - 1],
      modalVisible: visible,
    });
  }

  fetchImages(provider) {
    if (provider) {
      this.setState({ ...this.state, loading: true });
      loadCompanyImages(Platform.OS, provider.companyId)
        .then(({ status, data }) => {
          console.log(data);
          if (status === 200) {
            this.setState({ ...this.state, loading: false, images: data });
          } else {
            this.setState({ ...this.state, loading: false });
            Toast.show("Erro ao carregar imagens", {
              duration: Toast.durations.LONG,
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao carregar imagens", {
            duration: Toast.durations.LONG,
          });
        });
    } else {
      this.setState({ ...this.state, images: [] });
    }
  }

  componentDidMount() {
    this.props.providerEmitter.subscribe(
      this.componentKey,
      this.fetchImages.bind(this)
    );
    this.fetchImages();
  }

  componentWillUnmount() {
    this.props.providerEmitter.unsubscribe(this.componentKey);
  }

  render() {
    return (
      <SafeAreaView>
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
        </View>

        <FlatList
          data={this.state.images}
          keyExtractor={(item) => item.fileId}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                this.setModalVisible(true, item.fileId);
              }}
            >
              <View style={styles.imagewrap}>
                <ImageElement imagsource={item}></ImageElement>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
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
    flexBasis: 0,
    height: Dimensions.get("window").height / 3 - 3,
    width: Dimensions.get("window").width / 2 - 8,
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

export default Gallery;
