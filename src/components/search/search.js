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
import { findAddressByGeolocation } from "../../services/address-service";
import Toast from "react-native-root-toast";

class SearchResult extends Component {
  componentKey = "searchListKey";
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search: "",
      providers: [],
    };
  }

  _userDetails(item) {
    this.props.setProviderInfo(item);
    this.props.navigation.navigate("provider-detail-tabs");
  }

  searchProviders(filter) {
    this.setState({ ...this.state, loading: true });
    searchProvider(
      Platform.OS,
      this.props.loginEmitter?.userData?.authorization,
      filter
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({
            ...this.state,
            loading: false,
            providers: this.mapResponse(data),
          });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao buscar prestatores", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
      });
  }

  mapResponse(data) {
    var resp = [];
    if (data && data.length > 0) {
      data.map((p) => {
        resp.push({
          id: p.companyId,
          imageUrl: p.imageUrl,
          profession: p.providerType?.name,
          name: p.companyName,
          description: p.description,
        });
      });
    }

    return resp;
  }

  setFilter() {
    this.props.searchFilterEmitter.setFilter({
      ...this.props.searchFilterEmitter.filter,
      search: this.state.search,
    });
  }

  findAddressByGeolocation(geolocation) {
    this.setState({ ...this.state, loading: true });
    findAddressByGeolocation(
      Platform.OS,
      this.props.loginEmitter?.userData?.authorization,
      geolocation
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false });
          this.props.searchFilterEmitter.setFilter({
            ...this.props.searchFilterEmitter.filter,
            state: data.state,
            city: data.city,
            cityId: data.city.cityId,
          });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao buscar localização", {
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
          if (result?.coords?.latitude && result?.coords?.longitude) {
            this.findAddressByGeolocation({
              latitude: result.coords.latitude.toString(),
              longitude: result.coords.longitude.toString(),
            });
          }
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
            onChangeText={(value) =>
              this.setState({ ...this.state, search: value })
            }
            value={this.state.search}
          ></TextInput>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => this.setFilter()}
          >
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
                    <TouchableOpacity onPress={() => this._userDetails(item)}>
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
          {/* <Text>{this.props.provider.description}</Text> */}
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
