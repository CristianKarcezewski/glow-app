import React, { Component } from 'react';
import { StyleSheet,Text, View, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Provider from '../../models/provider'

function Search({ navigation }){

  // Append right button on toolbar
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Login" onPress={() => navigation.navigate('login')} />
      ),
    });
  }, [navigation]);

  return (
    <SearchResult/>
  )
}

class SearchResult extends Component{

  constructor(){
    super();
    this.state = {
      providers: []
    }
  }

  componentDidMount(
    p = [
      Provider(null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
      Provider(null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
    ]
  );

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
        <View style={{flex: 1}}>
          <FontAwesomeIcon icon={ faUser } style={{flex: 1}}/>
        </View>
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