import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { updateProvider } from "../../services/provider-service";
import Toast from "react-native-root-toast";

class BuyPackage extends Component {
  //numberCardPattern = /[0-9]/;
  //namePattern = /([a-z])/g;
  //dateParttern ="";

  constructor(props) {
    super(props);
    this.state = {
      numberCard: "",
      name: "",
      validNumberCard: true,
      validName: true,
      loading: false,
    };
  }

  _buyConclude() {
    if (this.state.validNumberCard && this.state.validName) {
      Alert.alert(
        "Finalizar a compra",
        `Confirmar compra de ${this.props.selectedPackage.name} com valor de ${this.props.selectedPackage.value}?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          { text: "OK", onPress: () => this.handleProviderUpdate() },
        ]
      );
    }
        
  }

  handleProviderUpdate() {
      let provider = {
        companyId: this.props.registerEmitter.providerForm.companyId,       
        packageId: this.props.selectedPackage.packageId,       
      };

    updateProvider(
      Platform.OS,
      this.props.loginEmitter?.userData?.authorization,
      provider
    )
      .then(({ status, data }) => {
        if (status === 200) {
          if (data) {
            Toast.show("Informações Atualizadas!", {
              duration: Toast.durations.LONG,
            });
            this.setForm(data);
            this.props.navigation.popToTop();
          }
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao atualizar fornecedor", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Erro de conexão com cadastro de fornecedor", {
          duration: Toast.durations.LONG,
        });
      });
  }

  setForm(data) {
    this.props.registerEmitter.setProviderForm({
      ...this.props.registerEmitter.providerForm,
      commercialName: data.companyName,
      providerType: data.providerType,
      description: data.description,
      companyId: data.companyId,
      expirationDate: data.expirationDate,
    });
  }
  _handleNumberCard(value) {
    // if (this.numberCardPattern.test(value) === true) {
    //   this.setState({
    //     ...this.state,
    //     validNumberCard: true,
    //     numberCard: value,
    //   });
    // } else {
    //   this.setState({
    //     ...this.state,
    //     validNumberCard: false,
    //     numberCard: value,
    //   });
    // }
  }

  _handleName(value) {
    // if (this.namePattern.test(value.toLowerCase()) === true) {
    //   // if (this.state.name.length >= 20) {
    //   this.setState({
    //     ...this.state,
    //     validName: true,
    //     name: value.toLowerCase(),
    //   });
    // } else {
    //   this.setState({
    //     ...this.state,
    //     validName: false,
    //     name: value.toLowerCase(),
    //   });
    // }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={style.imageContainer}>
          <Image
            style={style.imageLogo}
            source={require("../../assets/creditCard.jpg")}
          />
        </View>

        <View style={style.container}>
          <TextInput
            style={
              this.state.validNumberCard
                ? style.validNumberCardField
                : style.validNumberCardField
            }
            maxLength={16}
            placeholder="Número do Cartão"
            onChangeText={(value) => this._handleNumberCard(value)}
            value={this.state.numberCard}
          />

          <TextInput
            placeholder="Nome do Titular"
            style={
              this.state.validName
                ? style.validNameField
                : style.invalidNameField
            }
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
          <TextInput
            placeholder="Data de validade"
            secureTextEntry={true}
            style={style.validNameField}
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
          <TextInput
            placeholder="CVV/CVC"
            style={style.validNameField}
            onChangeText={(value) => this._handleName(value)}
            value={this.state.name}
          />
        </View>

        <View style={style.container2}>
          <TouchableOpacity
            style={style.loginButton}
            onPress={() => this.props.navigation.navigate("service-package")}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.registerButton}
            onPress={() => this._buyConclude()}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Concluir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    marginTop: 100,
    width: 320,
    height: 200,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  container2: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  validNumberCardField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },
  invalidNumberCardField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "#db382f",
    borderWidth: 2,
    borderRadius: 15,
  },
  validNameField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
  },
  invalidNameField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    margin: 10,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "#db382f",
    borderWidth: 2,
    borderRadius: 15,
  },
  loginButton: {
    borderRadius: 15,
    width: "50%",
    margin: 30,
    padding: 2,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
  },
  registerButton: {
    borderRadius: 15,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
    padding: 2,
  },
});

export default BuyPackage;
