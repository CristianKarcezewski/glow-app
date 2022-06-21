import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import imagem from "../../assets/Ampulheta.jpg";
import { getProviderPacks } from "../../services/provider-packs-service";
import Toast from "react-native-root-toast";

class ServicePacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      packList: [],
    };
  }

  _handleLoadPacks() {
    this.setState({ ...this.state, loading: true });
    getProviderPacks(
      Platform.OS,
      this.props.loginEmitter?.userData?.authorization
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({
            ...this.state,
            loading: false,
            packList: data,
          });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar os pacotes de serviço.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _selectData(item) {
    if (item) {
      this.props.setPackage(item);
    }
    this.props.navigation.navigate("buy-package");
  }

  componentDidMount() {
    this._handleLoadPacks();
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <Text style={style.cardResultName}>Adicionar Creditos:</Text>
        </View>
        <View style={{ flex: 14 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.packList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._selectData(item)}>
                <CardResult pack={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

class CardResult extends Component {
  render() {
    return (
      <View style={style.cardResultContainer}>
        <View style={style.cardResultImage}>
          <Image
            source={imagem}
            style={{ flex: 1, width: "100%", borderRadius: 30 }}
          ></Image>
        </View>

        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={style.cardResultName}>{this.props.pack.name}</Text>
          <Text style={{ fontSize: 20 }}>{this.props.pack.description}</Text>
          <Text>{this.props.pack.value}</Text>
        </View>
        <View style={style.cardResultRating}></View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  cardResultContainer: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderColor: "#db382f",
    borderWidth: 1,
    borderRadius: 20,
    height: 100,
  },
  cardResultImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 40,
    margin: 10,
  },
  cardResultName: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  cardResultRating: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ServicePacks;
