import React, { Component, useState } from 'react';
import { StyleSheet,Text, View, TouchableHighlight, FlatList, TouchableOpacity, TextInput  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBars, faStar, faSearch, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import Provider from '../../models/provider'

function Search({navigation,loginEmitter}){

  const [userLoggedIn, setUser] = useState(false);

  function loggedIn(value){
    setUser(() => value);
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
          <TouchableHighlight style={style.headerLoginButton} onPress={() => navigation.navigate('login')}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color:'#fff'}}>Login</Text>
          </TouchableHighlight>
        ),
      });
    }
  }, [navigation]);

  return (
    <SearchResult navigation={navigation}/>
  )
}

class SearchResult extends Component{

  constructor(){
    super();
    this.state = {
      providers: [
        new Provider('1', null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider('2', null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
        new Provider('3', null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider('4', null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
        new Provider('5', null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider('6', null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
        new Provider('7', null, 'Encanador', 'João', 'Um dos mais bem avaliados da região'),
        new Provider('8', null, 'Diarista', 'Maria', 'Entre as mais confiaveis que você precisa'),
      ]
    }
  }

  render(){

    return(
      <View style={{flex: 1, marginTop: 10}}>
        <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 10, alignItems: 'center'}}>
          <TextInput placeholder={'Pesquisar'} style ={{fontSize: 24, flex: 5, marginLeft: 20, borderBottomColor: 'black', borderBottomWidth: 1}}></TextInput>
          <TouchableOpacity style={{flex:1, alignItems: 'center'}}>
            <FontAwesomeIcon icon={ faSearch } size={25} color={'#db382f'}/>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, alignItems: 'center'}} onPress={() => this.props.navigation.navigate('filter')}>
            <FontAwesomeIcon icon={ faSearchPlus } size={25} color={'#db382f'}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 14}}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.providers}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('provider-details')}>
                <CardResult provider={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }

}

class CardResult extends Component{
  
  render(){
    return(
      <View style={style.cardResultContainer}>
        <View style={style.cardResultImage}>
          <FontAwesomeIcon icon={ faUser } size={40} style={{flex: 1}}/>
        </View>

        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={style.cardResultName}>{this.props.provider.name}</Text>
          <Text style={{fontSize: 20, }}>{this.props.provider.profession}</Text>
          <Text>{this.props.provider.description}</Text>
        </View>

        <View style={style.cardResultRating}>
          <Text style={{fontSize: 20}}>4.2</Text>
          <FontAwesomeIcon icon={ faStar } style={{fontSize: 20}} color={'gold'}/>
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
    borderColor: '#db382f',
    borderWidth: 1,
    borderRadius: 20,
    height: 100,
  },
  cardResultImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    margin: 10,
  },
  cardResultName: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  cardResultRating: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLoginButton: {
    borderRadius: 30,
    width: 60,
    height: 30,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#db382f',
    alignItems: 'center',
    elevation: 10,
    justifyContent: 'center',
    elevation: 20,
  },
});

export default Search;