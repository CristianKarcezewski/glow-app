import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

class ProviderRegister extends Component {
  componentKey = "ProviderRegisterKey";
  constructor(props) {
    super(props);
    this.state = {
      providerTypeName: null,
      description: null,
      stateName: null,
      cityName: null,
    };
  }

  _changeFilter(providerForm) {
    this.setState({
      ...this.state,
      providerTypeName: providerForm?.providerType
        ? providerForm.providerType.name
        : null,
    });
  }

  componentDidMount() {
    this.props.registerEmitter.subscribe(
      this.componentKey,
      this._changeFilter.bind(this)
    );
  }

  componentWillUnmount() {
    this.props.registerEmitter.unsubscribe(this.componentKey);
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
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => this.props.navigation.navigate("select-provider-type")}
        >
          <Text style={{ fontSize: 20, paddingLeft: 20 }}>
            {this.state?.providerTypeName || "Atividade Realizada"}
          </Text>
        </TouchableOpacity>

        <View style={styles.description}>
          <TextInput
            style={{
              flex: 1,
              textAlign: "left",
              textAlignVertical: "top",
            }}
            maxLength={1000}
            placeholder="Explique aqui o que você faz"
          />
        </View>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => this.props.navigation.navigate("select-state")}
        >
          <Text style={{ fontSize: 20, paddingLeft: 20 }}>
            {this.state?.stateName || "Estado onde atende"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => this.props.navigation.navigate("select-city")}
        >
          <Text style={{ fontSize: 20, paddingLeft: 20 }}>
            {this.state?.cityName || "Cidade onde atende"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.buttons, backgroundColor: "#db382f" }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
            Cadastrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
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

const styles = StyleSheet.create({
  selectButton: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 20,
    fontSize: 20,
  },
  description: {
    flex: 2,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 20,
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

export default ProviderRegister;
