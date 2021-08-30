import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Address from "../../models/address";
import imagem from "../../assets/endereco.jpg";
import ActionButton from "react-native-action-button";
import commonStyles from "../commonStyles";

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [
        new Address(
          "1",
          null,
          "Casa",
          "Caxias do Sul",
          "Dante Franciasco Zatera",
          "310",
          ""
        ),
        new Address(
          "2",
          null,
          "Empresa",
          "Farroupliha",
          "José Franciasco Borges",
          "310",
          "Apto 301"
        ),
        new Address(
          "3",
          null,
          "Casa da Praia",
          "Torres",
          "Independencia",
          "110",
          ""
        ),
        new Address(
          "1",
          null,
          "Casa",
          "Caxias do Sul",
          "Dante Franciasco Zatera",
          "310",
          ""
        ),
        new Address(
          "2",
          null,
          "Empresa",
          "Farroupliha",
          "José Franciasco Borges",
          "310",
          "Apto 301"
        ),
        new Address(
          "3",
          null,
          "Casa da Praia",
          "Torres",
          "Independencia",
          "110",
          ""
        ),
      ],
    };
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
          <Text style={style.cardResultName}>Endereços Cadastrados:</Text>
        </View>
        <View style={{ flex: 14 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.address}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate()}
              >
                <CardResult address={item} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flex: 3,
            // flexDirection: "row",
            //alignItems: "center",
            //width: "100%",
            backgroundColor: "#FFF",
            marginTop: 20,
          }}
        >
          <ActionButton            
            buttonColor={commonStyles.colors.today}
            onPress={() => {
              this.setState({});
            }}
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
          <Text style={style.cardResultName}>{this.props.address.name}</Text>
          <Text style={{ fontSize: 20 }}>{this.props.address.city}</Text>
          <Text style={{ fontSize: 14 }}>
            {this.props.address.publicPlace} ,{this.props.address.number}{" "}
            {this.props.address.complement}
          </Text>
        </View>
        <View style={style.cardResultRating}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => this.props.navigation.navigate("provider-filter")}
          >
            <FontAwesomeIcon icon={faTrash} size={25} color={"#db382f"} />
          </TouchableOpacity>
        </View>
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
    // borderColor: "#db382f",
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

export default AddressList;
