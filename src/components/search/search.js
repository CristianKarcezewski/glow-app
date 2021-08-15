import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

// class Search extends Component{

//   render(){

//     return(
//       <View>
//         <Text>Search component</Text>
//         <Button title="Go to Login" onPress={() => this.props.navigation.navigate('login')} />
//       </View>
//     );
//   }

// }

function Search({ navigation }){

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('login')} title="Login" />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Search component</Text>
      <Button title="Go to Login" onPress={() => this.props.navigation.navigate('login')} />
    </View>
  )
}


export default Search;