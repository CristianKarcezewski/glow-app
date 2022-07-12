import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

class ProviderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
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
        <View style={{ flex: 1, backgroundColor: "#fff", margin: 10 }}>
          <View style={styles.header}>
            <View style={styles.headerImage}>
              {this.props.provider?.fileUrl ? (
                <Image
                  style={styles.imageLogo}
                  source={{ uri: this.props.provider.fileUrl }}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} size={85} />
              )}
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
                {this.props?.provider?.name}
              </Text>
              <Text style={{ fontSize: 20, margin: 5 }}>
                {this.props?.provider?.profession}
              </Text>
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
            <Text style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}>
              Sobre:
            </Text>
            <Text style={{ fontSize: 14, margin: 15 }}>
              {this.props?.provider?.description}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  headerImage: {
    flex: 2,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    margin: 10,
    marginTop: 35,
    height: 150,
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
  cardResultTextDetailsDescription: {
    margin: 15,
  },
  imageLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
});

export default ProviderDetails;
