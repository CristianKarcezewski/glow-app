import React, { Component } from 'react';
import { View,Text,Button,TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class Toolbar extends Component{

  render(){
    return (
      <View style={viewStyle.container}>
        <TouchableOpacity style={iconStyle.container}>
          <FontAwesomeIcon icon={ faArrowLeft } size={26}/>
        </TouchableOpacity>

        <Text style={titleStyle.container}>"View title"</Text>

        <View style={buttonStyle.container} >
          <Button title="Login"/>
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

const iconStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
  }
});

const titleStyle = StyleSheet.create({
  container: {
    flex: 4,
    fontSize: 42,
  },
});

const buttonStyle = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
  },
});

export default Toolbar