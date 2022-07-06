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

const numColumns = 2;

// const initialState = {
//   modalVisible: false,
//   modalImage: {
//     id: "1",
//     uri: "https://i.pinimg.com/564x/83/a6/e4/83a6e4ab304920fdacccd5882928377e.jpg",
//   },
//   imagesList: [
//     {
//       id: "1",
//       uri: "https://i.pinimg.com/564x/83/a6/e4/83a6e4ab304920fdacccd5882928377e.jpg",
//     },
//     {
//       id: "2",
//       uri: "https://i.pinimg.com/736x/26/4a/95/264a9505707ad9ea4839af7f55428fc9.jpg",
//     },
//     {
//       id: "3",
//       uri: "https://i.pinimg.com/236x/5b/2f/99/5b2f99e89ff804781c9bc4488320f1a4.jpg",
//     },
//     {
//       id: "4",
//       uri: "https://i.pinimg.com/564x/fa/13/9b/fa139b350e96b9198ad4d7d0cdf9b265.jpg",
//     },
//     {
//       id: "5",
//       uri: "https://i.pinimg.com/564x/cb/1d/4d/cb1d4de2fef4b937c7bcac5e1289bf38.jpg",
//     },
//     {
//       id: "6",
//       uri: "https://i.pinimg.com/564x/e3/cb/95/e3cb95b3a8ac30a0c9cea81c0099004c.jpg",
//     },
//     {
//       id: "7",
//       uri: "https://i.pinimg.com/236x/b9/7a/a5/b97aa5e32a61043731623204230884ca.jpg",
//     },
//     {
//       id: "8",
//       uri: "https://i.pinimg.com/236x/2b/a3/19/2ba319270b7a7e182d6b53df2fe16b17.jpg",
//     },
//     {
//       id: "9",
//       uri: "https://i.pinimg.com/236x/3c/a2/d8/3ca2d8a34da5c711a9b91f9e72684b2f.jpg",
//     },
//     {
//       id: "10",
//       uri: "https://i.pinimg.com/236x/7d/db/f6/7ddbf6bc04cca0960064a96f3e1ba799.jpg",
//     },
//   ],
// };

class Gallery extends Component {
  componentKey = "providerGalleryKey";
  state = {
    modalVisible: false,
    modalImage: null,
    images: [],
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imagesList: [],
  //     loading: false,
  //   };
  // }

  openImage(img) {
    this.setState({ ...this.state, modalVisible: true, modalImage: img });
  }

  _handleLoadCompanyImages() {
    this.setState({ ...this.state, loading: true });
    loadCompanyImages(
      Platform.OS,
      this.props.providerRegisterEmitter,
      this.props.provider.companyId
    )
      .then(({ status, data }) => {
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
  }

  componentDidMount() {
    this.props.providerRegisterEmitter.subscribe(
      componentKey,
      this._handleLoadCompanyImages
    );
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
          data={this.state.imagesList}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                this.openImage(item);
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
    width: Dimensions.get("window").width / 3 - 8,
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
