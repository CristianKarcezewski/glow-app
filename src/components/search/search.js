import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Search extends Component{

  render(){
    return(
      <View>
        <Text>Search component</Text>
        <Button title="Go to Login" onPress={this.props.handleNavigation('Login')} />
      </View>
    );
  }

}

export default Search;