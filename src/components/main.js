import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './search';
import Login from './login';

class Main extends Component {

  constructor(){
    super();
    this.stack = createNativeStackNavigator();
  }

  _handleNavigation(screen){
    console.log(screen);
    console.log(this.stack.Screen(screen));
  }

  render(){
    return (
      <NavigationContainer>
        <this.stack.Navigator initialRouteName="Glow">
          <this.stack.Screen name="Glow" >
            {props => <Search {...props} handleNavigation={this._handleNavigation.bind(this)} />}
          </this.stack.Screen>
          <this.stack.Screen name="Login" component={Login} />
        </this.stack.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({
  main: {
    flex:1,
    flexDirection: 'column',
  },
  content: {
    flex: 11,
  },
});

export default Main;