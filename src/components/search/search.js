import React, { Component, useState } from 'react';
import { StyleSheet,Text, View, Button, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import Provider from '../../models/provider'

function Search({navigation,loginEmitter}){

  const [userLoggedIn, setUser] = useState(false);

  async function loggedIn(value){
    await setUser(value);
  };
  loginEmitter.subscribe('appToolbarButton',loggedIn);

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

  constructor(){
    super();
    this.state = {
      providers: [
        new Provider(1, null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider(2, null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
        new Provider(3, null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider(4, null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
        new Provider(5, null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider(6, null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
        new Provider(7, null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider(8, null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
      ]
    }
  }

  render(){

    return(
      <FlatList
        keyExtractor={(item) => item.id}
        data={this.state.providers}
        renderItem={({item}) => <CardResult provider={item}/>}
      />
    );
  }

}

class CardResult extends Component{
  
  render(){
    return(
      <View style={style.cardResultContainer}>
        <View style={{flex: 1}}><FontAwesomeIcon icon={ faUser } style={{flex: 1}}/></View>
        <View style={{flex: 4}}>

          <View>
            <Text>{this.props.provider.name}</Text>
            <Text>{this.props.provider.profession}</Text>
            <Text>{this.props.provider.description}</Text>
          </View>

        </View> 
      </View>
    )
  }
}

const style = StyleSheet.create({
  cardResultContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default Search;