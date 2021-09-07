import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

class LocationFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      data: [],
    };
  }

  _loadData() {
    this.setState({
      ...this.state,
      data: this.props.searchData(this.props.showStates),
    });
  }

  _filterData() {
    if (this.state.search) {
      return this.state.data.filter((x) =>
        x.name.toLowerCase().includes(this.state.search.toLowerCase())
      );
    } else {
      return this.state.data;
    }
  }

  render() {
    return (
      <Modal
        style={style.modal}
        visible={this.props.visible}
        animationType={"fade"}
        transparent={false}
        onShow={() => this._loadData()}
        onRequestClose={() => this.props.close()}
      >
        <View style={style.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 10,
              paddingTop: 10,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={"Pesquisar"}
              style={{
                fontSize: 24,
                flex: 5,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
              onChangeText={(value) =>
                this.setState({ ...this.state, search: value })
              }
              value={this.state.search}
            ></TextInput>
          </View>
          <View style={{ flex: 8, padding: 20 }}>
            <FlatList
              keyExtractor={(item) => item.name}
              data={this._filterData()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.close(item)}
                  style={{ marginTop: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      borderBottomColor: "#db382f",
                      borderBottomWidth: 1,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this.props.close()}
              style={style.button}
            >
              <Text style={{ fontSize: 20 }}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: 40,
  },
  container: {
    flex: 1,
    marginHorizontal: "10%",
    marginVertical: "20%",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    elevation: 10,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    elevation: 10,
  },
});

export default LocationFilterModal;
