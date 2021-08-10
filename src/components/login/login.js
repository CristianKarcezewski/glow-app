import React, { Component } from 'react';
import { View,Button } from 'react-native';

class Login extends Component{

  _handleSubmit(){
    console.log('login!')
  }

  render(){
    <form style={loginStyle.container} onSubmit={this._handleSubmit.bind(this)}>
      <input type="email" placeholder="Email"/>
      <input type="password" placeholder="Password"/>
      <Button type="submit">Login</Button>
    </form>
  }
}

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Login;