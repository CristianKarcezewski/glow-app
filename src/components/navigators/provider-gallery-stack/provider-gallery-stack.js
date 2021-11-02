import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gallery from "../../gallery";
import AddPhoto from "../../add-photo";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";


class ProviderGalleryStack extends Component {

  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();
  }  

  render() {
    console.log("Aqui")

    return (
      <this.stack.Navigator initialRouteName="provider-gallery-stack">
        <this.stack.Screen
          name="provider-gallery-stack"
          options={({ navigation }) => ({
            title: "Galeria",
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => navigation.goBack()}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={20}
                  style={{ flex: 1 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerLoginButton}
                onPress={() => navigation.navigate("add-photo")}                
              >
                <FontAwesomeIcon icon={faPlus} color={"#fff"} size={20} />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => (
            <Gallery
              {...props}
              // loginEmitter={this.props.loginEmitter}
              // registerEmitter={this.props.registerEmitter}
            />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="add-photo"
          options={{
            title: "Adicionar Foto",
            // headerShown: false,
          }}
        >
          {(props) => (
            <AddPhoto
              {...props}
              //searchFilterEmitter={this.props.searchFilterEmitter}
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  headerLoginButton: {
    borderRadius: 10,
    padding: 3,
    width: 70,
    height: 30,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#db382f",
    alignItems: "center",
    elevation: 10,
    justifyContent: "center",
    elevation: 20,
  },
});

export default ProviderGalleryStack;
