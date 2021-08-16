import React, { Component } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Search from './search';
import Login from './login';
import UserRegister from './user-register';
import LoginEmitter from '../models/login-emitter'

class DrawerNavigator extends Component{
  constructor(props){
    super(props);
    this.drawer = createDrawerNavigator();
  }
  render(){
    return (
      <this.drawer.Navigator initialRouteName="root" screenOptions={{drawerPosition:'right', headerShown: false}}>
        <this.drawer.Screen name="root" options={{headerShown: false, title: 'Início'}}>
          {props => <StackNavigator {...props}/>}
        </this.drawer.Screen>

        {/* <this.drawer.Screen
          name='glow'
          component={StackNavigator}
          options={{headerShown: false}}
        /> */}
      </this.drawer.Navigator>
    );
  }
}

class StackNavigator extends Component{

  constructor(props){
    super(props);
    this.stack = createNativeStackNavigator();
  }

  render(){
    return (
      <this.stack.Navigator initialRouteName="glow">

        <this.stack.Screen
          name="glow"
          options={() => ({
            headerTitle: () => <Image source={require('../assets/glow-logo.jpeg')}/>,
          })}
        >
          {props => <Search {...props}/>}
        </this.stack.Screen>

        {/* <this.stack.Screen
          name="glow"
          component={Search}
          options={() => ({
            headerTitle: () => <Image source={require('../assets/glow-logo.jpeg')}/>,
          })}
        /> */}
  
        <this.stack.Screen 
          name="login"
          options={{
            title: "Login",
          }}
        >
          {props => <Login {...props}/>}
        </this.stack.Screen>
  
        <this.stack.Screen 
          name="user-register"
          component={UserRegister}
          options={{
            title: "Cadastro de usuário",
          }}
        />

      </this.stack.Navigator>
    );

  }
}

class Main extends Component {

  constructor(){
    super();
    this.logginEmitter = new LoginEmitter();
    this.state = {
      userLoggedIn: false,
    }
  }

  _handleLogin(token){
    console.log(token);
    this.setState({userLoggedIn: true});
  }

  componentDidMount(){
    this.logginEmitter.subscribe(this._handleLogin.bind(this));
  }

  render(){
    return (
      <NavigationContainer>
        <DrawerNavigator userLoggedIn={this.state.userLoggedIn} logginEmitter={this.logginEmitter}/>
      </NavigationContainer>
    );
  }
}

export default Main;