import React, { Component} from 'react';
import { StyleSheet,Text, View, TextInput, TouchableHighlight, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

class UserRegister extends Component{  


  constructor(){
    super();
    this.state = {
      states: ['Santa Catarina', 'Rio Grande do Sul'],
      selectedState: 'Rio Grande do Sul',
    }
  }

  render(){
    
    return(
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={style.imageContainer}>                    
          <Image style={style.imageLogo} source={require('../../assets/glow-logo.jpeg')}/>
        </View>                
        <View style={style.container}>                   
          <TextInput style={style.formField} maxLength={50} type="nome" placeholder="Nome"/>
          <TextInput style={style.formField} maxLength={50} type="email" placeholder="E-mail"/>
          <TextInput style={style.formField} type="telefone" placeholder="Tefefone"/>
          
          {/* <Picker 
            selectedValue={this.state.selectedState} 
            onValueChange={(itemValue) => this.setState({...this.state, selectedState:itemValue})}
          >
            {
              this.state.states.map((st,index) => {
                return <Picker.Item label={st} value={st} key={index}/>
              })
            }
          </Picker  > */}
                                          
          <TextInput style={style.formField} type="estado" placeholder="  Estado"/>
          <TextInput style={style.formField} type="cidade" placeholder="  Cidade"/>
          <TextInput style={style.formField} type="senha" placeholder="  Senha"/>
          <TextInput style={style.formField} type="confirmaSenha" placeholder="  Confirma Senha"/>
          <TouchableHighlight style={style.registerButton}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>Cadastrar</Text>
          </TouchableHighlight>
        </View>
      
      </View> 
    );
  }    
}

const style = StyleSheet.create({
    imageContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageLogo: {
      width: '50%',
      marginTop: 10,
    },
    container: {
      flex: 8,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },  
    formField: {
      width: '80%',
      paddingLeft: 20,
      paddingRight: 20,
      margin: 5,
      fontSize: 20,
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 20,
    },
    registerButton: {
      borderRadius: 30,
      width: '50%',
      margin: 10,
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: '#db382f',
      alignItems: 'center',
      elevation: 10,
    },
}); 
export default UserRegister;