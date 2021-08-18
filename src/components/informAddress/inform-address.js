import React, { Component } from 'react';
import { StyleSheet,Text,TextInput, View, TouchableHighlight, Image} from 'react-native';


class InformAddress extends Component {

render(){
    return (
        <View>            
            <View style={styles.imageContainer}>                    
                <Image style={styles.imageLogo} source={require('../../assets/maps.jpg')}/>
            </View> 
             <View style={{backgroundColor:'#fff'},styles.cardDescritionConteiner} >
                <View style={styles.cardResultTextDetailsTitle}>
                    <Text style={{fontSize:18}}>Descrição:</Text><TextInput style={styles.cardTextInputBox} maxLength={50} type="informacoes" placeholder="Informe aqui suas habilidades!!"/> 
                    <Text style={{fontSize:18}}>Descrição:</Text><TextInput style={styles.cardTextInputBox} maxLength={50} type="informacoes" placeholder="Informe aqui suas habilidades!!"/>  
                    <Text style={{fontSize:18}}>Descrição:</Text><TextInput style={styles.cardTextInputBox} maxLength={50} type="informacoes" placeholder="Informe aqui suas habilidades!!"/>  
                </View>             
                        
            </View>
            <View style={styles.cardBottunConteiner}>             
                
                <View style={styles.cardButtonsConteiner}>         
                <TouchableHighlight style={styles.cardResultButton} onPress={() => this.props.navigation.navigate('provider-register')}>
                    <Text style={{fontSize: 20}}>Adicionar jornada de trabalho</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.cardResultButton} onPress={() => this.props.navigation.navigate('inform-address')}>
                    <Text style={{fontSize: 20}}>Adicionar endereço de trabalho</Text>
                </TouchableHighlight>          
            </View>
            </View>
        </View>


        )
    }

}

const styles = StyleSheet.create({
    imageContainer: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageLogo: {
      width: '100%',
     
      marginTop: 10,
    },
    cardPrimaryConteiner: {
        flex: 1,
        paddingHorizontal:15,
        paddingVertical:30,
        backgroundColor: '#fff',
    },
    cardSelectorConteiner: {
        flex:1,
        padding: 15,
        backgroundColor: '#fff',        
    },
    cardDescriptionConteiner: {
        flex: 4,
        
        backgroundColor: '#fff',
        alignItems:'stretch',      
    },
    cardBottunConteiner: {
        flex: 4,
        backgroundColor: '#fff', 
        justifyContent: 'center',  
        alignItems: 'stretch', 
        marginTop:15,    
    },
    cardSelectTextBox: {       
        paddingLeft: 20,
        paddingRight: 20,
        padding:5,
        fontSize: 16,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardResultTextDetailsTitle: {        
        fontSize: 18,
        backgroundColor: '#fff',
        marginStart:7,
    },
    cardTextInputBox: {
        width: '100%',
        paddingLeft: 7,
        paddingRight: 7,
        padding:50,
        fontSize: 20,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        borderWidth: 2,        
        marginTop:1,
        fontSize:16,
    },
    cardResultButton: {
        borderRadius: 30,       
        marginHorizontal: '2%',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#db382f',
        marginTop:5,
        marginBottom:10,
        width: '95%',
        height: '30%',
        alignItems: 'center',          
        justifyContent: 'center',        
    },   

});   
export default InformAddress;