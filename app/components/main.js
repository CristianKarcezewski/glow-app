import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import Toolbar from './toolbar/toolbar';

class Main extends Component {
  render(){
    return (
      <View style={mainStyle.container}>
        <Toolbar></Toolbar>
        <View style={contentStyle.container}></View>
      </View>
    );
  }
}

const mainStyle = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
  },
});

const contentStyle = StyleSheet.create({
  container: {
    flex: 11,
  },
});

export default Main;