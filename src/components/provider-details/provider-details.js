import React, { Component } from 'react';
import { StyleSheet,Text, View, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';


class ProviderDetails extends Component{

  render(){
    return(
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.cardImageDetailsConteiner}>  
            <View style={styles.cardResultImage}>
                <FontAwesomeIcon icon={ faUser } size={40} />
            </View>
            <View style={{flex: 3, justifyContent: 'center'}}>
                <Text style={styles.cardResultTextDetails}>João da Silva</Text>
                <Text style={styles.cardResultTextDetails}>Encanador</Text>
                <Text style={styles.cardResultTextDetails}>Avaliação: 6</Text>
            </View>      
        </View>
        <View style={styles.cardDescriptionConteiner}>  
            <View> 
              <Text style={styles.cardResultTextDetailsTitle}>Descrição:</Text> 
            <View>                
            </View>  
                <Text style={styles.cardResultTextDetailsDescription}>{loren}</Text>                             
            </View>          
        </View>
            <Text style={styles.cardResultTextDetailsTitle}>Ir Para:</Text> 
            <View style={styles.cardButtonsConteiner}>         
                <TouchableOpacity style={styles.cardButtonConteiner}>
                    <Text style={{fontSize: 20}}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardButtonConteiner} onPress={() => console.log('Click endereço')}>
                    <Text style={{fontSize: 20}}>Endereço</Text>
                </TouchableOpacity>          
            </View>
      </View>
    )
  }
} 

const loren= "Lorem ipsum lorem orci leo posuere proin molestie, libero in inceptos laoreet rutrum phasellus, aptent leo tempor nunc lectus ipsum.";

const styles = StyleSheet.create({

    cardResultImage: {     
        flex: 2,        
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',  
        marginLeft:5,         
        borderRadius: 20,
        margin: 10,    
    },
    cardResultTextDetails: {
        fontSize: 16,        
        padding:4,     
    },
    cardImageDetailsConteiner: {
        flex: 1,
        flexDirection: 'row',
    },
    cardDescriptionConteiner: {
        flex: 2,
        alignItems: 'stretch',   
        paddingTop:20,    
        width: '100%',  
        backgroundColor: '#F8F8F9',    
    },
    cardButtonsConteiner: {
        flex: 1, 
        flexDirection: 'row',       
        margin: 12,
        width: '100%', 
        backgroundColor: '#F8F8F9',    
    },
    cardResultTextDetailsTitle: {
        justifyContent: "flex-start",
        textAlign:'left', 
        fontSize: 16,
        marginLeft:10,
        backgroundColor: '#F8F8F9', 
    }, 
    cardResultTextDetailsDescription: {
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
      cardButtonConteiner: {
        borderRadius: 30,
        width: '50%',
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#db382f',
        alignItems: 'center',
        width: '45%',
        height: '40%',
        alignItems: 'center',   
        paddingHorizontal: 15,
        justifyContent: 'center',
      },     
});


export default ProviderDetails;