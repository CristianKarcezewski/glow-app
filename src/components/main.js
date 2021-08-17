import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Search from './search';
import Login from './login';
import UserRegister from './user-register';
import LoginEmitter from '../models/login-emitter';
import ProviderDetails from './provider-details';
import GlowTheme from '../shared/theme';
import ProviderRegister from './provaider-register';

class DrawerNavigator extends Component{

  constructor(props){
    super(props);
    this.drawer = createDrawerNavigator();
  }

  render(){
    return (
      <this.drawer.Navigator initialRouteName="root" screenOptions={{drawerPosition:'right', headerShown: false}}>
        <this.drawer.Screen name="root" options={{headerShown: false, title: 'Início'}}>
          {props => <StackNavigator {...props} loginEmitter={this.props.loginEmitter}/>}
        </this.drawer.Screen>

        <this.drawer.Screen
          name='exit'
          children={() => this.props.loginEmitter.logout()}
          options={{headerShown: false, title: 'Sair'}}
        />
      </this.drawer.Navigator>
    );
  }
}

class StackNavigator extends Component{

  constructor(props){
    super(props);
    this.stack = createNativeStackNavigator();
    this.state = {
      userLoggedIn: false,
    }
  }

  async _handleLogin(value){
    await this.setState({userLoggedIn: value});
  }

  componentDidMount(){
    this.props.loginEmitter.subscribe('stackNavigator', this._handleLogin.bind(this));
  }

  render(){
    return (
      <this.stack.Navigator initialRouteName="glow">

        <this.stack.Screen
          name="glow"
          options={() => ({
            headerTitle: () => <Image source={require('../assets/glow-logo.png')} style={style.image} />,
          })}
        >
          {props => <Search {...props} loginEmitter={this.props.loginEmitter} userLoggedIn={this.state.userLoggedIn}/>}
        </this.stack.Screen>
  
        <this.stack.Screen 
          name="login"
          options={{
            title: "Login",
          }}
        >
          {props => <Login {...props} loginEmitter={this.props.loginEmitter}/>}
        </this.stack.Screen>
  
        <this.stack.Screen 
          name="user-register"
          component={UserRegister}
          options={{
            title: "Cadastro de usuário",
          }}
        />

        <this.stack.Screen 
          name="provider-details"
          component={ProviderDetails}
          options={{
            title: "Detalhes do Profissional",
          }}
        />
         <this.stack.Screen 
          name="provider-register"
          component={ProviderRegister}
          options={{
            title: "Cadastro do Profissional",
          }}
        />
      </this.stack.Navigator>
    );

  }
}

class Main extends Component {

  constructor(){
    super();
    this.loginEmitter = new LoginEmitter();
  }

  render(){
    return (
      <NavigationContainer theme={GlowTheme}>
        <DrawerNavigator loginEmitter={this.loginEmitter}/>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({
  image: {
    width: 150,
    height: 40,
  },
});

export default Main;