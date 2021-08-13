import React, { Component } from 'react';
import { StyleSheet,Button, View } from 'react-native';

class Login extends Component{

  render(){
    return(
      // <form style={loginStyle.container}>
      //   <input type="email" placeholder="Email"/>
      //   <input type="password" placeholder="Password"/>
      //   <Button title="Login" />
      // </form>
      <View>
        <Button title="Login" />
      </View>
    )
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