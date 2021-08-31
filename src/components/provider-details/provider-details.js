import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

class ProviderDetails extends Component {
  componentKey = "providerDetails";

  constructor(props) {
    super(props);
    this.state = {
      laodingComponent: true,
      userLoggedIn: false,
    };
  }

  _handleLogin(value) {
    this.setState({ ...this.setState, userLoggedIn: value });
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      userLoggedIn: this.props.emitters.loginEmitter.userLoggedIn,
    });
    this.props.emitters.loginEmitter.subscribe(
      this.componentKey,
      this._handleLogin.bind(this)
    );
    setTimeout(
      () => this.setState({ ...this.state, laodingComponent: false }),
      2000
    );
  }

  componentWillUnmount() {
    this.props.emitters.loginEmitter.unsubscribe(this.componentKey);
  }

  render() {
    if (this.state.laodingComponent) {
      return (
        <ActivityIndicator
          size={"large"}
          color={"#db382f"}
          animating={this.state.laodingComponent}
          style={{ flex: 1 }}
        />
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff", margin: 10 }}>
          <View style={styles.header}>
            <View style={styles.headerImage}>
              <FontAwesomeIcon icon={faUser} size={60} />
            </View>
            <View style={styles.headerData}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  borderBottomColor: "#db382f",
                  borderBottomWidth: 1,
                  margin: 5,
                }}
              >
                João da Silva
              </Text>
              <Text style={{ fontSize: 20, margin: 5 }}>Encanador</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, margin: 5 }}>Avaliação:</Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <FontAwesomeIcon icon={faStar} color={"gold"} />
                  <FontAwesomeIcon icon={faStar} color={"gold"} />
                  <FontAwesomeIcon icon={faStar} color={"gold"} />
                  <FontAwesomeIcon icon={faStar} color={"gold"} />
                  <FontAwesomeIcon icon={faStarHalfAlt} color={"gold"} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.cardResultTextDetailsTitle}>Sobre:</Text>
            <Text style={styles.cardResultTextDetailsDescription}>{loren}</Text>
          </View>
        </View>
      );
    }
  }
}

const loren =
  "Lorem ipsum lorem orci leo posuere proin molestie, libero in inceptos laoreet rutrum phasellus, aptent leo tempor nunc lectus ipsum.";

const styles = StyleSheet.create({
  headerImage: {
    flex: 2,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: 10,
  },
  headerData: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
  },
  container: {
    flex: 2,
    alignItems: "stretch",
    paddingTop: 20,
    width: "100%",
    backgroundColor: "#F8F8F9",
  },
});

export default ProviderDetails;
