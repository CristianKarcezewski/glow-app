import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { loadStates, loadCities } from "../../services/location-service";
import Toast from "react-native-root-toast";

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

  _handleLoadStates() {
    this.setState({ ...this.state, loading: true });
    loadStates(Platform.OS)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.setStates(data);
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar estados.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleLoadCities(stateId) {
    this.setState({
      ...this.state,
      statesModal: false,
      loading: true,
    });
    loadCities(Platform.OS, stateId)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.setCities(data);
          this.setState({
            ...this.state,
            loading: false,
            selectedState: stateId,
          });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar cidades.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _changeFilter(filter) {
    this.setState({
      ...this.state,
      stateName:
        this.props.locationsEmitter.states.find((x) => x.id === filter.stateId)
          .name || null,
      cityName:
        this.props.locationsEmitter.cities.find((x) => x.id === filter.citiId)
          .name || null,
    });
  }

  componentDidMount() {
    this.props.searchFilterEmitter.subscribe(
      this.componentKey,
      this._changeFilter.bind(this)
    );
    if (this.props.locationsEmitter.states.length == 0) {
      this._handleLoadStates();
    }
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
            style={style.modalButton}
            onPress={() => {
              this.navigation.navigate("select-state");
            }}
          >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>
              {this.state.stateName
                ? this.state.stateName
                : "Selecionar estado"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.modalButton}
            onPress={() => {
              this.navigation.navigate("select-city");
            }}
          >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>
              {this.state.cityName ? this.state.cityName : "Selecionar cidade"}
            </Text>
          </TouchableOpacity>

          <View style={style.pickerView}>
            <Picker
              style={style.picker}
              selectedValue={
                this.state.professionTypes[this.state.selectedProfessionalType]
              }
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  ...this.state,
                  selectedProfessionalType: itemIndex,
                })
              }
            >
              {this.state.professionTypes.map((st, index) => {
                return <Picker.Item label={st} value={st} key={index} />;
              })}
            </Picker>
          </View>

          <TouchableOpacity
            style={{ ...style.buttons, backgroundColor: "#db382f" }}
            onPress={() => this.props.navigation.popToTop()}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Aplicar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttons}
            onPress={() => this.props.close()}
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
  pickerView: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    borderRadius: 20,
  },
  picker: {
    margin: 5,
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
  modalButton: {
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
