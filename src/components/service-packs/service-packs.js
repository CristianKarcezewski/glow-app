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
import {
  faUser,
  faStar,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Provider from "../../models/provider";
import imagem from "../../assets/Ampulheta.jpg";

class ServicePacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [
        new Provider("1", null, "30 dias", "Pacote Prata", "R$ 100,00"),
        new Provider("2", null, "60 dias", "Pacote Ouro", "R$ 180,00"),
        new Provider("3", null, "90 dias", "Pacote Diamante", "R$ 340,00"),        
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
          {/* <TextInput
            placeholder={"Pesquisar"}
            style={{
              fontSize: 24,
              flex: 5,
              marginLeft: 20,
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          ></TextInput>
          <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
            <FontAwesomeIcon icon={faSearch} size={25} color={"#db382f"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => this.props.navigation.navigate("provider-filter")}
          >
            <FontAwesomeIcon icon={faFilter} size={25} color={"#db382f"} />
          </TouchableOpacity> */}
          <Text style={style.cardResultName}>Adicionar Creditos:</Text>
        </View>
        <View style={{ flex: 14 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.providers}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate()}
              >
                <CardResult provider={item} />
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
          {/* <FontAwesomeIcon icon={faUser} size={40} style={{ flex: 1 }} /> */}
          <Image
            source={imagem}
            style={{ flex: 1, width: "100%", borderRadius:30 }}
          ></Image>
        </View>

        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={style.cardResultName}>{this.props.provider.name}</Text>
          <Text style={{ fontSize: 20 }}>{this.props.provider.profession}</Text>
          <Text>{this.props.provider.description}</Text>
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
