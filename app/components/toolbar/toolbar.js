import React, { Component } from 'react';
import { View,Text,Button,TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class Toolbar extends Component{

  _handleLogin(){
    this.setState()
    this.props.changeTitle('Login');
  }

  _handleBack(){
    this.props.changeTitle('Glow');
  }

  render(){
    if (this.props.title == "Glow"){
      return (
        <View style={viewStyle.container}>

          <Text style={{flex: 4,fontSize: 42,paddingLeft: 70,}}>{this.props.title}</Text>
  
          <View style={{flex: 2,alignItems: 'center',}} >
            <Button title="Login" onPress={this._handleLogin.bind(this)}/>
          </View>
        </View>
      );

    }else{

      return (
        <View style={viewStyle.container}>
          <TouchableOpacity style={{flex: 1,paddingLeft: 20,}}>
            <FontAwesomeIcon icon={ faArrowLeft } size={26} onPress={this._handleBack.bind(this)}/>
          </TouchableOpacity>
  
          <Text style={{flex: 4,fontSize: 42,}}>{this.props.title}</Text>
  
          <View style={{flex: 2,alignItems: 'center',}} >
            <Button title="Login" onPress={this._handleLogin.bind(this)}/>
          </View>
        </View>
      );
    }
  }
}

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 10,
  },
});

export default Toolbar