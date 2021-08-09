import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import Toolbar from './toolbar/toolbar';

class Main extends Component {

  constructor(){
    super();
    this.state = {
      toolbarTitle: "Glow"
    }
  }

  handleChangeToolbarTitle(title){
    const st = {toolbarTitle: title}
    this.setState(st)
  }

  render(){
    return (
      <View style={mainStyle.container}>
        <Toolbar title={this.state.toolbarTitle} changeTitle={this.handleChangeToolbarTitle.bind(this)}></Toolbar>
        <View style={contentStyle.container} >
          
        </View>
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