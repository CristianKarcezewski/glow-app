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
import {
  registerProvider,
  getCompanyByUser,
  updateProvider,
} from "../../../../services/provider-service";
import moment from "moment";
import "moment/locale/pt-br";

class ProviderRegister extends Component {
  componentKey = "ProviderRegisterKey";
  constructor(props) {
    super(props);
    this.state = {
      commercialName: null,
      providerType: null,
      description: null,
      stateName: null,
      cityName: null,
      expirationDate: null,
    };
  }

  fetchCompany() {
    if (this.props.loginEmitter?.userData?.userGroupId === 2) {
      this.setState({ ...this.state, loading: true });
      getCompanyByUser(
        Platform.OS,
        this.props.loginEmitter?.userData?.authorization
      )
        .then(({ status, data }) => {
          if (status === 200) {
            if (data) {
              this.setForm(data);
            }
          } else {
            this.setState({ ...this.state, loading: false });
            Toast.show("Erro ao carregar dados da sua conta", {
              duration: Toast.durations.LONG,
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível conectar ao servidor", {
            duration: Toast.durations.LONG,
          });
        });
    } else {
      this.props.registerEmitter.reset();
      this._changeFilter(this.props.registerEmitter.providerForm);
    }
  }

  _changeFilter(providerForm) {
    this.setState({
      ...this.state,
      commercialName: providerForm.commercialName || null,
      description: providerForm.description || null,
      providerType: providerForm.providerType || null,
      stateName: providerForm.state?.name || null,
      cityName: providerForm.city?.name || null,
      expirationDate: providerForm.expirationDate || null,
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
      (this.state.providerType.name == null ||
        this.state.providerType.name === "")
    ) {
      Toast.show("Selecione um ramo de atividade");
      flag = false;
    }
    if (
      !this.props.registerEmitter.providerForm.companyId &&
      flag &&
      (this.state.stateName == null || this.state.stateName === "")
    ) {
      Toast.show("Informe uma estado");
      flag = false;
    }
    if (
      !this.props.registerEmitter.providerForm.companyId &&
      flag &&
      (this.state.stateName == null || this.state.cityName === "")
    ) {
      Toast.show("Informe uma cidade");
      flag = false;
    }

    if (flag) {
      if (this.props.registerEmitter.providerForm.companyId) {
        this.handleProviderUpdate();
      } else {
        this.handleProviderRegister();
      }
    }
  }

  handleProviderUpdate() {
    this.setState({ ...this.state, loading: true });

    let provider = {
      companyId: this.props.registerEmitter.providerForm.companyId,
      companyName: this.state.commercialName,
      providerTypeId: this.state.providerType.providerTypeId,
      description: this.state.description,
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

  handleProviderRegister() {
    this.setState({ ...this.state, loading: true });
    let provider = {
      companyName: this.state.commercialName,
      providerTypeId: this.state.providerType.providerTypeId,
      description: this.state.description,
      stateUf: this.props.registerEmitter.providerForm.state.uf,
      cityId: this.props.registerEmitter.providerForm.city.cityId,
    };

    registerProvider(
      Platform.OS,
      this.props.loginEmitter?.userData?.authorization,
      provider
    )
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false });
          this.props.loginEmitter.login({
            ...this.props.loginEmitter?.userData,
            userGroupId: 2,
          });
          if (data) {
            this.setForm(data);
          }
          this.successfullRegistered();
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Erro ao cadastrar prestador", {
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

  setForm(data) {
    this.props.registerEmitter.setProviderForm({
      ...this.props.registerEmitter.providerForm,
      commercialName: data.companyName,
      providerType: data.providerType,
      description: data.description,
      companyId: data.companyId,
      expirationDate: data.expirationDate,
    });

    this.props.providerEmitter.setProvider(data.companyId);
  }

  successfullRegistered() {
    Alert.alert(
      "Novo prestador",
      "Você é um prestador!",
      [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
      { cancelable: false }
    );
  }

  stateButton() {
    return (
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => this.props.navigation.navigate("select-state")}
      >
        <Text style={{ fontSize: 20, paddingLeft: 20 }}>
          {this.state?.stateName || "Estado onde atende"}
        </Text>
      </TouchableOpacity>
    );
  }

  cityButton() {
    return (
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => this.props.navigation.navigate("select-city")}
      >
        <Text style={{ fontSize: 20, paddingLeft: 20 }}>
          {this.state?.cityName || "Cidade onde atende"}
        </Text>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    this.props.registerEmitter.subscribe(
      this.componentKey,
      this._changeFilter.bind(this)
    );
    this.props.loginEmitter.subscribe(
      this.componentKey,
      this.fetchCompany.bind(this)
    );
    this.fetchCompany();
  }

  componentWillUnmount() {
    this.props.registerEmitter.unsubscribe(this.componentKey);
    this.props.loginEmitter.unsubscribe(this.componentKey);
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
          onChangeText={(value) => {
            this.props.registerEmitter.providerForm = {
              ...this.props.registerEmitter.providerForm,
              commercialName: value,
            };
            this.setState({ ...this.state, commercialName: value });
          }}
          value={this.state.commercialName}
        />

        <TouchableOpacity
          style={styles.formField}
          onPress={() => this.props.navigation.navigate("select-provider-type")}
        >
          <Text style={{ fontSize: 20, paddingLeft: 20 }}>
            {this.state.providerType?.name || "Atividade Realizada"}
          </Text>
        </TouchableOpacity>

        <View style={styles.description}>
          <TextInput
            style={{
              flex: 1,
              textAlign: "left",
              textAlignVertical: "top",
            }}
            maxLength={500}
            multiline={true}
            placeholder="Explique aqui o que você faz"
            onChangeText={(value) => {
              this.props.registerEmitter.providerForm = {
                ...this.props.registerEmitter.providerForm,
                description: value,
              };
              this.setState({ ...this.state, description: value });
            }}
            value={this.state.description}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 5,
              padding: 10,
              marginLeft: 10,
            }}
          >
            {this.state.expirationDate
              ? `Seu pacote de serviço expira em:
               ${moment(
                 this.state.expirationDate,
                 "DD/mm/yyyy HH:MM:SS"
               ).format("DD/mm/yyyy HH:MM")}`
              : null}
          </Text>
        </View>
        {this.props.registerEmitter.providerForm.companyId
          ? null
          : this.stateButton()}
        {this.props.registerEmitter.providerForm.companyId
          ? null
          : this.cityButton()}
        <TouchableOpacity
          style={{ ...styles.buttons, backgroundColor: "#db382f" }}
          onPress={() => this.saveProvider()}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
            {this.props.registerEmitter.providerForm.companyId
              ? "Atualizar"
              : "Cadastrar"}
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
    borderRadius: 15,
    fontSize: 20,
  },
  description: {
    flex: 2,
    textAlignVertical: "top",
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
