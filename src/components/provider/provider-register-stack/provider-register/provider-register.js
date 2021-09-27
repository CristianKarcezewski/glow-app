import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";


class ProviderRegister extends Component {
  componentKey = "ProviderRegisterKey";
  constructor(props) {
    super(props);
    this.state = {
      providerTypeName: null,
    };
  }

  _changeFilter(filter) {
    this.setState({
      ...this.state,
      providerTypeName: filter.providerType ? filter.providerType.name : null,
    });
  }

  componentDidMount() {
    //this.props.searchFilterEmitter.subscribe(
    //  this.componentKey,
     this._changeFilter.bind(this)
    //);
 }

  // componentWillUnmount() {
  //   this.props.searchFilterEmitter.unsubscribe(this.componentKey);
  // }
  
  render() {
    return (
      <View style={styles.cardPrimaryConteiner}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() =>
            this.props.navigation.navigate("select-provider-type")
          }
        >
          <Text style={{ fontSize: 20, paddingLeft: 20 }}>
            {this.state?.providerTypeName || "Atividade Realizada"}
          </Text>
        </TouchableOpacity>

        <View
          style={({ backgroundColor: "#fff" }, styles.cardDescritionConteiner)}
        >
          <View style={styles.cardResultTextDetailsTitle}>
            <Text style={{ fontSize: 18 }}>Descrição:</Text>
          </View>
          <View>
            <TextInput
              style={styles.cardTextInputBox}
              maxLength={50}
              type="informacoes"
              placeholder="Informe aqui suas habilidades!!"
            />
          </View>
        </View>
        <View style={styles.cardBottunConteiner}>
          <Text style={styles.cardResultTextDetailsTitle}>Ir Para:</Text>
          <View style={styles.cardButtonsConteiner}>
            <TouchableHighlight
              style={styles.cardResultButton}
              onPress={() =>
                this.props.navigation.navigate("provider-register")
              }
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
                Adicionar jornada de trabalho
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.cardResultButton}
              onPress={() => this.props.navigation.navigate("inform-address")}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
                Adicionar endereço de trabalho
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardPrimaryConteiner: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  cardSelectorConteiner: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  cardDescriptionConteiner: {
    flex: 4,

    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  cardBottunConteiner: {
    flex: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 15,
  },
  cardSelectTextBox: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    fontSize: 16,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardResultTextDetailsTitle: {
    fontSize: 18,
    backgroundColor: "#fff",
    marginStart: 7,
  },
  cardTextInputBox: {
    width: "100%",
    paddingLeft: 7,
    paddingRight: 7,
    padding: 50,
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 20,
    borderWidth: 2,
    marginTop: 1,
    fontSize: 16,
  },
  cardResultButton: {
    borderRadius: 15,
    marginHorizontal: "2%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    marginTop: 15,
    marginBottom: 10,
    width: "95%",
    height: "27%",
    alignItems: "center",
    justifyContent: "center",
  },
  locationButton: {
    //width: "100%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 15,
    fontSize: 20,
  },
});

export default ProviderRegister;
