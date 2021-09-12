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
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      loading: false,
    };
  }

  _handleLoadStates() {
    this.setState({ ...this.state, loading: true });
    loadStates(Platform.OS)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.locationsEmitter.setStates(data);
          this.setState({ ...this.state, loading: false });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar estados.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _handleLoadCities(stateId) {
    this.setState({
      ...this.state,
      loading: true,
    });
    loadCities(Platform.OS, stateId)
      .then(({ status, data }) => {
        if (status === 200) {
          this.props.locationsEmitter.setCities(data);
          this.setState({
            ...this.state,
            loading: false,
          });
        } else {
          this.setState({ ...this.state, loading: false });
          Toast.show("Não foi possível carregar cidades.", {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...this.state, loading: false });
        Toast.show("Sem conexão com internet.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  _filterData() {
    // this.setState({ ...this.state, loading: true });
    if (this.props.state) {
      let st;
      if (this.state.search) {
        st = this.props.locationsEmitter.states.filter((x) =>
          x.name.toLowerCase().includes(this.state.search.toLowerCase())
        );
        // this.setState({ ...this.state, loading: false });
        return st;
      } else {
        // this.setState({ ...this.state, loading: false });
        return this.props.locationsEmitter.states;
      }
    } else {
      let ct;
      if (this.state.search) {
        ct = this.props.locationsEmitter.cities.filter((x) =>
          x.name.toLowerCase().includes(this.state.search.toLowerCase())
        );
        // this.setState({ ...this.state, loading: false });
        return ct;
      } else {
        // this.setState({ ...this.state, loading: false });
        return this.props.locationsEmitter.cities;
      }
    }
  }

  _selectData(item) {
    if (item) {
      if (this.props.state) {
        this.props.searchFilterEmitter.setFilter({
          ...this.props.searchFilterEmitter.filter,
          stateId: item.stateId,
        });
      } else {
        this.props.searchFilterEmitter.setFilter({
          ...this.props.searchFilterEmitter.filter,
          cityId: item.cityId,
        });
      }
    }
    this.props.navigation.goBack();
  }

  componentDidMount() {
    if (this.props.locationsEmitter.states.length == 0) {
      this._handleLoadStates();
    }
    if (
      this.props.searchFilterEmitter.filter.stateId != null &&
      this.props.locationsEmitter.cities.length == 0
    ) {
      this._handleLoadCities(this.props.searchFilterEmitter.filter.stateId);
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
              keyExtractor={(item) => item.name}
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
