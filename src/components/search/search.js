import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUserAlt,
  faStar,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import * as Location from "expo-location";
import { searchProvider } from "../../services/provider-service";
import { Provider } from "../../models/provider";

class SearchResult extends Component {
  componentKey = "searchListKey";
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      providers: [],
      // providers: [
      //   new Provider(
      //     "1",
      //     null,
      //     "Encanador",
      //     "João",
      //     "Um dos mais bem avaliados da região"
      //   ),
      //   new Provider(
      //     "2",
      //     "https://i.pravatar.cc/150?img=32",
      //     "Diarista",
      //     "Maria",
      //     "Entre as mais confiaveis que você precisa"
      //   ),
      //   new Provider(
      //     "3",
      //     null,
      //     "Encanador",
      //     "João",
      //     "Um dos mais bem avaliados da região"
      //   ),
      //   new Provider(
      //     "4",
      //     null,
      //     "Diarista",
      //     "Maria",
      //     "Entre as mais confiaveis que você precisa"
      //   ),
      //   new Provider(
      //     "5",
      //     null,
      //     "Encanador",
      //     "João",
      //     "Um dos mais bem avaliados da região"
      //   ),
      //   new Provider(
      //     "6",
      //     null,
      //     "Diarista",
      //     "Maria",
      //     "Entre as mais confiaveis que você precisa"
      //   ),
      //   new Provider(
      //     "7",
      //     null,
      //     "Encanador",
      //     "João",
      //     "Um dos mais bem avaliados da região"
      //   ),
      //   new Provider(
      //     "8",
      //     null,
      //     "Diarista",
      //     "Maria",
      //     "Entre as mais confiaveis que você precisa"
      //   ),
      // ],
    };
  }

  searchProviders(filter) {
    searchProvider(Platform.OS, this.props.loginEmitter.authorization, filter)
      .then(({ status, data }) => {
        if (status === 200) {
          signInWithCustomToken(firebaseAuth, data.authorization)
            .then((userCredential) => {
              // Signed in
              userCredential.user
                .getIdToken()
                .then((idToken) =>
                  this.props.loginEmitter.login(idToken, data.userGroupId)
                );
              this.setState({ ...this.state, loading: false });
              this.props.navigation.popToTop();
            })
            .catch((error) => {
              console.log("error", error);
              this.setState({ ...this.state, loading: false });
            });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Usuário ou senha inválidos...", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
      });
  }

  requestLocation() {
    Location.requestForegroundPermissionsAsync().then((status) => {
      if (status.status === "granted") {
        Location.getCurrentPositionAsync().then((result) => {
          this.props.searchFilterEmitter.setFilter({
            ...this.props.searchFilterEmitter.filter,
            latitude: result.latitude,
            longitude: result.longitude,
          });
        });
      }
    });
  }

  componentDidMount() {
    this.props.searchFilterEmitter.subscribe(
      this.componentKey,
      this.searchProviders.bind(this)
    );
    this.requestLocation();
  }

  componentWillUnmount() {
    this.props.searchFilterEmitter.unsubscribe(this.componentKey);
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
          <TextInput
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
            onPress={() =>
              this.props.navigation.navigate("provider-filter-stack")
            }
          >
            <FontAwesomeIcon icon={faFilter} size={25} color={"#db382f"} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 14 }}>
          {this.state.loading ? (
            <ActivityIndicator
              size={"large"}
              color={"#db382f"}
              animating={this.state.loading}
              style={{ flex: 1 }}
            />
          ) : (
            <View style={{ flex: 1 }}>
              {this.state.providers.length > 0 ? (
                <FlatList
                  keyExtractor={(item) => item.id}
                  data={this.state.providers}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("provider-detail-tabs")
                      }
                    >
                      <CardResult provider={item} />
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={{ fontSize: 20, flex: 1, padding: 20 }}>
                  Nenhum resultado encontrado. Tente modificar os filtros.
                </Text>
              )}
            </View>
          )}
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
          {this.props.provider.imageUrl ? (
            <Image
              style={style.imageLogo}
              source={{ uri: this.props.provider.imageUrl }}
            />
          ) : (
            <FontAwesomeIcon size={40} icon={faUserAlt} />
          )}
        </View>

        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={style.cardResultName}>{this.props.provider.name}</Text>
          <Text style={{ fontSize: 20 }}>{this.props.provider.profession}</Text>
          <Text>{this.props.provider.description}</Text>
        </View>

        <View style={style.cardResultRating}>
          <Text style={{ fontSize: 20 }}>4.2</Text>
          <FontAwesomeIcon
            icon={faStar}
            style={{ fontSize: 20 }}
            color={"gold"}
          />
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
  imageLogo: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
});

export default SearchResult;
