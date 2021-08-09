import React, { Component } from 'react';
import { StyleSheet,SafeAreaView,StatusBar } from 'react-native';
import Main from './app/components/main'

class App extends Component {
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <Main/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
});

export default App;