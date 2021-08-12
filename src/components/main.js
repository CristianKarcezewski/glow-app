import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import Toolbar from './toolbar';

class Main extends Component {

  constructor(){
    super();
    this.state = {
      toolbarTitle: "Glow"
    }
  }

  handleChangeToolbarTitle(title){
    this.setState({toolbarTitle: title});
  }

  render(){
    return (
      <View style={style.main}>
        <Toolbar title={this.state.toolbarTitle} changeTitle={this.handleChangeToolbarTitle.bind(this)}></Toolbar>
        <View style={style.content} >
          
        </View>
      </View>
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