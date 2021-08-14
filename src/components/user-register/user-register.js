import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { StyleSheet,Text, View, TextInput, TouchableHighlight, Image } from 'react-native';

class UserRegister extends Component{

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
                    <TextInput style={style.formField} type="estado" placeholder="  Estado"/>
                    <TextInput style={style.formField} type="cidade" placeholder="  Cidade"/>
                    <TextInput style={style.formField} type="senha" placeholder="  Senha"/>
                    <TextInput style={style.formField} type="confirmaSenha" placeholder="  Confirma Senha"/>
                    <TouchableHighlight style={style.loginButton}>
                    <Text style={{fontSize: 25}}>Cadastrar</Text>
                 </TouchableHighlight>
                </View>
                
            </View> 
        )
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
   
    loginButton: {
      borderRadius: 30,
      width: '50%',
      margin: 10,
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: 'dodgerblue',
      alignItems: 'center',
      elevation: 10,
    },
    registerButton: {
      borderRadius: 30,
      width: '50%',
      margin: 10,
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: 'dodgerblue',
      alignItems: 'center',
      elevation: 10,
    },
    forgotPassword: {
      color: 'blue',
      fontSize: 20,
      margin: 10,
    },
    registerForm: {
        borderRadius: 30,
        width: '50%',
        margin: 10,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        elevation: 10,
      },
}); 
export default UserRegister;