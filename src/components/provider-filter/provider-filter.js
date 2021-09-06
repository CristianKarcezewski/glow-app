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
      selectedState: 0,
      selectedCity: 0,
      selectedProfessionalType: 0,
      favorites: false,
      loading: false,
      modal: false,
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
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleLoadCities() {
    this.setState({ ...this.state, loading: true });
    loadStates(Platform.OS, this.state.selectedCity)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.emitters.locationsEmitter.setCities(data);
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar cidades.", {
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

          <View style={style.pickerView}>
            <LocationFilterModal
              visible={this.state.modal}
            ></LocationFilterModal>
            <TouchableOpacity
              onPress={() => {
                this.setState({ ...this.state, modal: !this.state.modal });
              }}
            >
              <Text>Show Modal</Text>
            </TouchableOpacity>
            {/* <Picker
              style={style.picker}
              selectedValue={this.state.selectedState}
              onValueChange={(state) => this._handleStateChange(state.stateId)}
            >
              <Picker.Item label={"Estado"} key={0} />
              {this.props.emitters.locationsEmitter.states?.map((st) => {
                return (
                  <Picker.Item label={st.name} value={st} key={st.stateId} />
                );
              })}
            </Picker> */}
          </View>

          <View style={style.pickerView}>
            {/* <Picker
              style={style.picker}
              selectedValue={this.state.selectedCity}
              onValueChange={(city) =>
                this.setState({ ...this.state, selectedCity: city.cityId })
              }
            >
              <Picker.Item label={"Cidade"} key={0} />
              {this.props.emitters.locationsEmitter
                .getCityByStateId(this.state.selectedState)
                ?.map((city) => {
                  return (
                    <Picker.Item
                      label={city.name}
                      value={city}
                      key={city.cityId}
                    />
                  );
                })}
            </Picker> */}
          </View>

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
    paddingHorizontal: 20,
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
});

export default ProviderFilter;
