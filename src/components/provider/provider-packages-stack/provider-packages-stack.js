import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ServicePacks from "../../service-packs/service-packs";
import BuyPackage from "../../buy-package";

class ProviderPackagesStack extends Component {
  constructor(props) {
    super(props);
    this.stack = createNativeStackNavigator();   
  }
  
  render() {
    return ( 
        
      <this.stack.Navigator initialRouteName="service-package">
        <this.stack.Screen
          name="service-package"
          options={({ navigation }) => ({
            title: "Pacotes de Serviço",
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={20}
                  style={{ flex: 1 }}
                />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => (
            <ServicePacks {...props} 
            loginEmitter={this.props.loginEmitter} />
          )}
        </this.stack.Screen>

        <this.stack.Screen
          name="buy-package"
          options={{
            title: "Adiquirir Pacote",
            headerShown: true,
          }}
        >
          {(props) => (
            <BuyPackage
              {...props}
              loginEmitter={this.props.loginEmitter}              
            />
          )}
        </this.stack.Screen>
      </this.stack.Navigator>
   );
 }
}

const style = StyleSheet.create({
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
export default ProviderPackagesStack;
