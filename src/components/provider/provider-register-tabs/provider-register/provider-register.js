import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Toast from "react-native-root-toast";
import { registerProvider } from "../../../../services/provider-service";

class ProviderRegister extends Component {
  componentKey = "ProviderRegisterKey";
  constructor(props) {
    super(props);
    this.state = {
      commercialName: null,
      providerTypeName: null,
      description: null,
      stateName: null,
      cityName: null,
    };
  }

  _changeFilter(providerForm) {
    this.setState({
      ...this.state,
      commercialName:
        providerForm.commercialName || this.state.commercialName || null,
      description: providerForm.description || this.state.description || null,
      providerTypeName: providerForm?.providerType
        ? providerForm.providerType.name
        : null,
      stateName: providerForm.state?.name || null,
      cityName: providerForm.city?.name || null,
    });
  }

  saveProvider() {
    let flag = true;

    if (
      flag &&
      (this.state.commercialName == null || this.state.commercialName === "")
    ) {
      Toast.show("Informe um nome comercial");
      flag = false;
    }
    if (
      flag &&
      (this.state.providerTypeName == null ||
        this.state.providerTypeName === "")
    ) {
      Toast.show("Selecione um ramo de atividade");
      flag = false;
    }
    if (flag && (this.state.stateName == null || this.state.stateName === "")) {
      Toast.show("Informe uma cidade");
      flag = false;
    }
    if (flag && (this.state.cityName == null || this.state.cityName === "")) {
      Toast.show("Informe uma cidade");
      flag = false;
    }

    if (flag) {
      this.handleProviderRegister();
    }
  }

  handleProviderRegister() {
    this.setState({ ...this.state, loading: true });
    let provider = {
      companyName: this.state.commercialName,
      providerTypeId:
        this.props.registerEmitter.providerForm.providerType.providerTypeId,
      description: this.state.description,
      stateUf: this.props.registerEmitter.providerForm.state.uf,
      cityId: this.props.registerEmitter.providerForm.city.cityId,
    };

    registerProvider(
      Platform.OS,
      this.props.loginEmitter.userData.authorization,
      provider
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false });
          this.props.loginEmitter.userData.userGroupId = 2;
          this.successfullRegistered();
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro validar requisição", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro validar requisição", {
          duration: Toast.durations.LONG,
        });
      });
  }

  successfullRegistered() {
    Alert.alert(
      "Novo prestador",
      "Agora você é um prestador!",
      [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
      { cancelable: false }
    );
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
        <TextInput
          style={styles.formField}
          maxLength={50}
          placeholder="Nome comercial"
          onChangeText={(value) =>
            this.setState({ ...this.state, commercialName: value })
          }
          value={this.state.commercialName}
        />

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
            onChangeText={(value) =>
              this.setState({ ...this.state, description: value })
            }
            value={this.state.description}
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
          onPress={() => this.saveProvider()}
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
  formField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
  },
});

export default ProviderRegister;
