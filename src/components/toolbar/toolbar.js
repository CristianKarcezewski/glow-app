import React, { Component } from 'react';
import { View,Text,Button,TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class Toolbar extends Component{

  _handleLogin(title){
    this.props.changeTitle(title);
  }

  _handleBack(title){
    this.props.changeTitle(title);
  }

  render(){
    if (this.props.title == "Glow"){
      return (
        <DefaultToolbar title={this.props.title} login={this._handleLogin.bind(this)}/>
      );

    }else{

      return (
        <OptionsToolbar title={this.props.title} backButton={this._handleBack.bind(this)}/>
      );
    }
  }
}

class DefaultToolbar extends Component{

  _handleLogin(){
    this.props.login('Login');
  }

  render(){
    return (
      <View style={viewStyle.container}>

        <Text style={{flex: 4,fontSize: 42,paddingLeft: 70,}}>{this.props.title}</Text>

        <View style={{flex: 2,alignItems: 'center',}} >
          <Button title="Login" onPress={this._handleLogin.bind(this)}/>
        </View>
      </View>
    );
  }
}

class OptionsToolbar extends Component{

  _handleBack(){
    this.props.backButton('Glow');
  }

  render(){
    return (
      <View style={viewStyle.container}>
        <TouchableOpacity style={{flex: 1,paddingLeft: 20,}}>
          <FontAwesomeIcon icon={ faArrowLeft } size={26} onPress={this._handleBack.bind(this)}/>
        </TouchableOpacity>

        <Text style={{flex: 4,fontSize: 42,}}>{this.props.title}</Text>

        <View style={{flex: 2,alignItems: 'center',}} >
          <Button title="Login" disabled={true}/>
        </View>
      </View>
    );
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

export default Toolbar;