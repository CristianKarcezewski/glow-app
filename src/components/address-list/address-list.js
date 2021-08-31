import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity, 
  Image
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Address from "../../models/address";
import image from "../../assets/endereco.jpg";
import ActionButton from "react-native-action-button";
import commonStyles from "../../shared/commonStyles";
import Icon from "react-native-vector-icons/FontAwesome";

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
          "",
          true
        ),
        new Address(
          "2",
          null,
          "Empresa",
          "Farroupliha",
          "José Franciasco Borges",
          "310",
          "Apto 301",
          false
        ),
        new Address(
          "3",
          null,
          "Casa da Praia",
          "Torres",
          "Independencia",
          "110",
          "",
          false
        ),
        new Address(
          "1",
          null,
          "Casa",
          "Caxias do Sul",
          "Dante Franciasco Zatera",
          "310",
          "",
          false
        ),
        new Address(
          "2",
          null,
          "Empresa",
          "Farroupliha",
          "José Franciasco Borges",
          "310",
          "Apto 301",
          false
        ),
        new Address(
          "3",
          null,
          "Casa da Praia",
          "Torres",
          "Independencia",
          "110",
          "",
          false
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
                onPress={() =>
                  this.props.navigation.navigate("inform-address-manual")
                }
              >
                <CardResult address={item} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: "#FFF",
            marginTop: 20,
          }}
        >
          <ActionButton
            buttonColor={commonStyles.colors.today}
            onPress={() =>
              this.props.navigation.navigate("inform-address-manual")
            }
          />
        </View>
      </View>
    );
  }
}

class CardResult extends Component {
  render() {
    let check = null;
    if (this.props.address.active === true) {
      check = (
        <View style={style.done}>
          <Icon name="check" size={20} color={commonStyles.colors.secondary} />
        </View>
      );
    } else {
      check = <View style={style.pending} />;
    }

    return (
      <View style={style.cardResultContainer}>
        <View style={style.cardResultImage}>
          <Image
            source={image}
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
            onPress={() => this.props.navigation.navigate("inform-address-manual")}          
          >
            <FontAwesomeIcon icon={faTrash} size={25} color={"#db382f"} />
          </TouchableOpacity>
          <View style={style.checkContainer}>{check}</View>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  pending: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: "#555",
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddressList;
