import { text } from '@fortawesome/fontawesome-svg-core';
import React, { Component } from 'react';
import { StyleSheet,Text, View, TextInput, TouchableHighlight, Image } from 'react-native';


class LoginUserRegister extends Component{

  render(){
    return(
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.Container_Sup}>  
            <View style={styles.conteiner_Quad_1}>
                <Image style={styles.imageAvatar} source={require('../../assets/glow-logo.jpeg')}/>
                {/* <Image style={styles.imageAvatar} source={require('../../assets/avatar1.png')}/> */}
            </View>
             
            <View style={styles.Container_Quad_2}>
                <Text style={{margin:7,padding:7, marginTop:15}}>João da Silva</Text>    
                <Text style={{margin:7,padding:7}}>Eletricista</Text>
                <Text style={{margin:7, padding:7}}>Alvaliação: 6</Text>            
            </View>
        </View>
        <View style={styles.Container_Inf_Sup}>  
            <View> 
              <Text style={styles.textArea}>Descrição:</Text> 
            <View>                
            </View>  
                <Text style={styles.textAreaContainer}>                  
                </Text>            
            </View>          
        </View>
        <Text style={styles.textArea}>
            Ir Para:
        </Text> 
        <View style={styles.Container_Inf_Inf}>         
            <TouchableHighlight style={styles.containerButton} onPress={() => this.props.navigation.navigate('provider-detail')}>
                <Text style={{fontSize: 20}}>Chat</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.containerButton} onPress={() => this.props.navigation.navigate('provider-detail')}>
                <Text style={{fontSize: 20}}>Endereço</Text>
            </TouchableHighlight>          
        </View>
      </View>
    )
  }
} 
const styles = StyleSheet.create({

    Container_Sup: {     
        flexDirection: 'row',
        flex: 2,
        alignItems: 'stretch',       
        // borderStyle:'solid',
        //borderWidth:1, 
        width: '100%',  
        
    },
    Container_Inf_Sup: {         
        flex: 2,
        alignItems: 'stretch',       
        //borderStyle:'solid',
       // borderWidth:1,  
        width: '100%',  
        backgroundColor: '#F8F8F9',         
    },
    Container_Inf_Inf: {         
        flex: 1, 
        flexDirection: 'row',       
        margin: 12,
        width: '100%', 
        backgroundColor: '#F8F8F9',      
    },
    Container_Quad_1: {       
        flex: 2,   
        backgroundColor: '#F8F8F9',         
        display: "flex",
        
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
               
    },    
    ImageAvatar: {       
        flex: 2, 
        resizeMode: "contain",
        height: 100,
        width: 200
       
                   
    },    
    Container_Quad_2: {                      
        flex: 1,              
        fontSize: 18, 
        //borderWidth: 1,
        borderRadius: 4, 
        //borderColor: '#E6E5ED',            
        backgroundColor: '#F8F8F9',
        justifyContent: 'flex-start',        
        height: '100%',
        width: '100%', 
    },
        textAreaContainer: {
        padding: 10, 
        marginRight: 20,
        marginLeft: 20, 
        marginTop: 5,
        fontSize: 16, 
        borderWidth: 1,
        borderRadius: 4, 
        borderColor: '#E6E5ED', 
        backgroundColor: '#F8F8F9',
        justifyContent: 'flex-start',
        height: '80%',
        width: '90%', 
      },
      textArea: {        
        justifyContent: "flex-start",
        textAlign:'left', 
        fontSize: 16,
        marginLeft:10,
        backgroundColor: '#F8F8F9', 
      },
      containerButton: {
        borderRadius: 30,
        width: '50%',
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        width: '45%',
        height: '40%',
        alignItems: 'center',    

      },
      
});


export default LoginUserRegister;