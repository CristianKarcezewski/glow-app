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
import { getUserById } from "../../../services/user-service";
import Toast from "react-native-root-toast";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.showHeader(true);
  }

  fetchUser() {
    this.setState({ ...this.state, loading: true });

    getUserById(Platform.OS, this.props.loginEmitter.userData.authorization)
      .then(({ status, data }) => {
        if (status === 200) {
          this.setState({ ...this.state, loading: false, user: data });
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
        Toast.show("Erro ao carregar dados da sua conta", {
          duration: Toast.durations.LONG,
        });
      });
  }

  componentDidMount() {
    this.fetchUser();
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
      return <Text>{"userData"}</Text>;
    }
  }
}

export default UserData;
