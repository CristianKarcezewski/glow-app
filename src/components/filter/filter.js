import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      states: ["Santa Catarina", "Rio Grande do Sul"],
      cities: [
        "Caxias do Sul",
        "Farroupilha",
        "Bento Gonçalves",
        "Flores da Cunha",
      ],
      professionTypes: ["Todos", "Funileiro", "Diarista", "Eletrecista"],
      selectedState: 1,
      selectedCity: 2,
      selectedProfessionalType: 0,
      favorites: false,
    };
  }

  render() {
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
          <Picker
            style={style.picker}
            selectedValue={this.state.states[this.state.selectedState]}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ ...this.state, selectedState: itemIndex })
            }
          >
            {this.state.states.map((st, index) => {
              return <Picker.Item label={st} value={st} key={index} />;
            })}
          </Picker>
        </View>

        <View style={style.pickerView}>
          <Picker
            style={style.picker}
            selectedValue={this.state.cities[this.state.selectedCity]}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ ...this.state, selectedCity: itemIndex })
            }
          >
            {this.state.cities.map((st, index) => {
              return <Picker.Item label={st} value={st} key={index} />;
            })}
          </Picker>
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

export default Filter;
