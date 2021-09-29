import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { loadStates, loadCities } from "../../services/location-service";
import Toast from "react-native-root-toast";

class LocationSelect extends Component {
  locationComponentKey = "locationComponentKey";

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: null,
      loading: false,
    };
  }

  _handleLoadStates() {
    this.setState({ ...this.state, loading: true });
    loadStates(Platform.OS)
      .then(({ status, data }) => {
        if (status === 200 && data) {
          this.setState({ ...this.state, loading: false, data });
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

  _handleLoadCities(stateUf) {
    this.setState({
      ...this.state,
      loading: true,
    });
    loadCities(Platform.OS, stateUf)
      .then(({ status, data }) => {
        if (status === 200 && data) {
          this.setState({
            ...this.state,
            loading: false,
            data,
          });
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

  _filterData() {
    if (this.props.state) {
      if (this.state.search) {
        return (
          this.state.data.filter((x) =>
            x.name.toLowerCase().includes(this.state.search.toLowerCase())
          ) || []
        );
      } else {
        return this.state.data;
      }
    } else {
      if (this.state.search) {
        return (
          this.state.data.filter((x) =>
            x.name.toLowerCase().includes(this.state.search.toLowerCase())
          ) || []
        );
      } else {
        return this.state.data;
      }
    }
  }

  _selectData(item) {
    if (item) {
      this.props.onSelectData(item);
    }
    this.props.navigation.goBack();
  }

  componentDidMount() {
    if (this.props.state?.uf) {
      this._handleLoadCities(this.props.state.uf);
    } else {
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
        <View style={style.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 10,
              paddingTop: 20,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={"Pesquisar"}
              style={{
                fontSize: 24,
                flex: 5,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
              onChangeText={(value) =>
                this.setState({ ...this.state, search: value })
              }
              value={this.state.search}
            ></TextInput>
          </View>
          <View style={{ flex: 8, padding: 20 }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this._filterData()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this._selectData(item)}
                  style={{ marginTop: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      borderBottomColor: "#db382f",
                      borderBottomWidth: 1,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this._selectData()}
              style={style.button}
            >
              <Text style={{ fontSize: 20 }}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "10%",
  },
  button: {
    borderRadius: 30,
    width: "50%",
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    elevation: 10,
  },
});

export default LocationSelect;
