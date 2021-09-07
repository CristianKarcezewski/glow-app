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
import LocationFilterModal from "../modals/location-filter-modal/location-filter-modal";
import { loadStates, loadCities } from "../../services/location-service";
import Toast from "react-native-root-toast";

class ProviderFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionTypes: ["Todos", "Funileiro", "Diarista", "Eletrecista"],
      selectedState: null,
      selectedCity: null,
      selectedProfessionalType: 0,
      favorites: false,
      statesModal: false,
      citiesModal: false,
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

  _closeStatesModal(data) {
    if (data) {
      let len = this.props.emitters.locationsEmitter.getCitiesByStateId(
        data.stateId
      ).length;

      if (len == 0) {
        this._handleLoadCities(data.stateId);
      } else {
        this.setState({
          ...this.state,
          selectedState: data.stateId,
          statesModal: false,
        });
      }
    } else {
      this.setState({
        ...this.state,
        statesModal: false,
      });
    }
  }

  _closeCitiesModal(data) {
    if (data) {
      this.setState({
        ...this.state,
        selectedCity: data.cityId,
        citiesModal: false,
      });
    } else {
      this.setState({
        ...this.state,
        citiesModal: false,
      });
    }
  }

  modalData(showStates) {
    if (showStates) {
      return this.props.emitters.locationsEmitter.states;
    }
    if (!showStates && this.state.selectedState) {
      let ct = this.props.emitters.locationsEmitter.getCitiesByStateId(
        this.state.selectedState
      );
      return ct;
    }
    return [];
  }

  componentDidMount() {
    if (this.props.emitters.locationsEmitter.states.length == 0) {
      this._handleLoadStates();
    }
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

          <LocationFilterModal
            visible={this.state.statesModal}
            close={this._closeStatesModal.bind(this)}
            searchData={this.modalData.bind(this)}
            showStates={true}
          />
          <TouchableOpacity
            style={style.modalButton}
            onPress={() => {
              this.setState({ ...this.state, statesModal: true });
            }}
          >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>
              {this.state.selectedState
                ? this.props.emitters.locationsEmitter.states.find(
                    (x) => x.stateId === this.state.selectedState
                  ).name
                : "Selecionar estado"}
            </Text>
          </TouchableOpacity>

          <LocationFilterModal
            visible={this.state.citiesModal}
            close={this._closeCitiesModal.bind(this)}
            searchData={this.modalData.bind(this)}
          />
          <TouchableOpacity
            style={style.modalButton}
            onPress={() => {
              this.setState({ ...this.state, citiesModal: true });
            }}
          >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>
              {this.state.selectedCity
                ? this.props.emitters.locationsEmitter
                    .getCitiesByStateId(this.state.selectedState)
                    .find((x) => x.cityId === this.state.selectedCity).name
                : "Selecionar cidade"}
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
            onPress={() => this.props.navigation.popToTop()}
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
