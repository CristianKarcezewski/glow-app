import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox";

class ProviderFilter extends Component {
  componentKey = "ProviderFilterKey";
  constructor(props) {
    super(props);
    this.state = {
      professionTypes: ["Todos", "Funileiro", "Diarista", "Eletrecista"],
      selectedProfessionalType: 0,
      stateName: null,
      cityName: null,
      favorites: false,
      loading: false,
    };
  }

  _changeFilter(filter) {
    this.setState({ ...this.state, loading: true });
    let st, ct;
    if (filter.stateId) {
      st = this.props.locationsEmitter.states.find((x) => {
        return x.stateId === filter.stateId;
      });
    }
    if (filter.stateId && filter.cityId) {
      ct = this.props.locationsEmitter.cities.find((x) => {
        return x.cityId === filter.cityId;
      });
    }
    this.setState({
      ...this.state,
      stateName: st?.name || null,
      cityName: ct?.name || null,
      loading: false,
    });
  }

  componentDidMount() {
    this.props.searchFilterEmitter.subscribe(
      this.componentKey,
      this._changeFilter.bind(this)
    );
  }

  componentWillUnmount() {
    this.props.searchFilterEmitter.unsubscribe(this.componentKey);
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size={"large"}
          color={"#db382f"}
          animating={this.state.loading}
          style={{ flex: 1 }}
        />
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginBottom: 20,
              borderBottomColor: "#db382f",
              borderBottomWidth: 1,
            }}
          >
            Filtrar Serviços
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.setState({ ...this.state, favorites: !this.state.favorites })
            }
          >
            <View style={style.checkboxContainer}>
              <Checkbox
                style={style.checkbox}
                color={"#db382f"}
                value={this.state.favorites}
                onValueChange={() =>
                  this.setState({
                    ...this.state,
                    favorites: !this.state.favorites,
                  })
                }
              />
              <Text style={style.checkboxText}>Meus favoritos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.locationButton}
            onPress={() => this.props.navigation.navigate("select-state")}
          >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>
              {this.state.stateName
                ? this.state.stateName
                : "Selecionar estado"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.locationButton}
            onPress={() => this.props.navigation.navigate("select-city")}
          >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>
              {this.state.cityName ? this.state.cityName : "Selecionar cidade"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...style.buttons, backgroundColor: "#db382f" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Aplicar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttons}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "black" }}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const style = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    width: "80%",
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    borderRadius: 20,
  },
  checkboxText: {
    fontSize: 20,
    paddingTop: 5,
  },
  buttons: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    elevation: 10,
  },
  locationButton: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 20,
    fontSize: 20,
  },
});

export default ProviderFilter;
