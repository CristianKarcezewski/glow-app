import React, { Component, useState } from 'react';
import { StyleSheet,Text, View, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import Provider from '../../models/provider'

function Search({navigation,loginEmitter}){

  const [userLoggedIn, setUser] = useState(false);

  async function loggedIn(value){
    await setUser(value);
    console.log('search',userLoggedIn);
  };
  loginEmitter.subscribe('appToolbarButton',loggedIn);

  // Append right button on toolbar
  React.useLayoutEffect(() => {
    if (userLoggedIn){
      navigation.setOptions({
        headerRight: () => (
          <FontAwesomeIcon icon={faBars} onPress={() => navigation.toggleDrawer()} />
        ),
      });
    }else{
      navigation.setOptions({
        headerRight: () => (
          <Button title="Login" onPress={() => navigation.navigate('login')} />
        ),
      });
    }
  }, [navigation]);

  return (
    <SearchResult/>
  )
}

class SearchResult extends Component{

  render(){

    return(
      <View>
        
      </View>
    );
  }

}

class CardResult extends Component{
  render(){
    return(
      <View style={style.cardResultContainer}>
        <View style={{flex: 1}}><FontAwesomeIcon icon={ faUser } style={{flex: 1}}/></View>
        <View style={{flex: 3}}>

          <View>
            <Text>Nome do prestador...</Text>
          </View>

          <View>
            <View>
              <Text>Descrição...</Text>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  cardResultContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Search;