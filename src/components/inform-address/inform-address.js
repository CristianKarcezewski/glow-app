import React, { Component } from 'react';
import { StyleSheet,Text,TextInput, View, TouchableHighlight, Image} from 'react-native';


class InformAddress extends Component {

render(){
    return (
        <View style={styles.cardPrimaryConteiner}>            
            <View style={styles.imageContainer}>                    
                <Image style={styles.imageLogo} source={require('../../assets/maps.jpg')}/>
            </View> 
            <View style={{backgroundColor:'#fff'},styles.cardDescriptionConteiner} >
                <View style={styles.cardResultTextDetailsTitle}>
                    <Text style={styles.cardTextNameBox}>Numero:</Text><TextInput style={styles.cardTextInputBox} maxLength={50} type="informacoes" placeholder=""/>               
                </View>
                <View style={styles.cardResultTextDetailsTitle}>   
                    <Text style={styles.cardTextNameBox}>Complemento:</Text><TextInput style={styles.cardTextInputBox} maxLength={50} type="informacoes" placeholder=""/>
                </View>   
                <View style={styles.cardResultTextDetailsTitle}>   
                    <Text style={styles.cardTextNameBox}>Referencia:</Text><TextInput style={styles.cardTextInputBox} maxLength={50} type="informacoes" placeholder=""/>
                </View>  
            </View>                         
            <View style= {{flex:3}}>
                <View style={styles.cardButtonsUpperConteiner}>         
                    <TouchableHighlight style={styles.cardButtonUpperResult} onPress={() => console.log('Click endereço')}>
                    <Text  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Capturar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.cardButtonUpperResult} onPress={() => console.log('Click endereço')}>
                    <Text  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Salvar</Text>
                    </TouchableHighlight> 
                    <TouchableHighlight style={styles.cardButtonUpperResult} onPress={() => console.log('Click endereço')}>
                    <Text  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Descartar</Text>
                    </TouchableHighlight>                
                </View>
                <View style={styles.cardButtonsLowConteiner}>         
                    <TouchableHighlight style={styles.cardButtonLowResult}  onPress={() => this.props.navigation.navigate("inform-address-manual")}>
                    <Text  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Manualmente</Text>
                    </TouchableHighlight>                       
                </View>

            </View> 
        </View>       

        )
    }

}

const styles = StyleSheet.create({
   
    cardPrimaryConteiner: {
        flex: 1,
        padding:10,
        backgroundColor: '#fff',
    }, 
    imageContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:40,
      },  
    cardDescriptionConteiner: {
        flex: 2.5, 
        flexDirection: 'column',       
        backgroundColor: '#fff',
        alignItems:'stretch',      
    },    
    cardButtonsUpperConteiner: {
        flex: 1,
        flexDirection: 'row',       
        backgroundColor: '#fff', 
        justifyContent: 'center',  
        alignItems: 'stretch',         
        alignItems: 'center'   
    },
    cardButtonsLowConteiner: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'flex-start',  
        alignItems: 'center',
        width: '90%',
        height: '1%',
    },    
      imageLogo: {
        marginTop:60,
        width: '100%',         
      },   
    cardResultTextDetailsTitle: {        
        fontSize: 18,       
        flexDirection: 'row',        
    },
    cardTextInputBox: {
        flex:2,
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,     
        backgroundColor: '#F8F8F9',        
        marginTop:10,
        fontSize:16,        
    },
    cardTextNameBox: {
        flex:1,        
        paddingLeft: 5,
        paddingRight: 5,      
        marginTop:10,
        fontSize:16,        
    },    
    cardButtonUpperResult: {
        flex:2,
        borderRadius: 15,
        padding:5,
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#db382f',
        alignItems: 'center',
        width: '45%',
        height: '45%',
        justifyContent: 'center',
      },    
    cardButtonLowResult: {        
        borderRadius: 15,       
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "#db382f",
        alignItems: "center",      
        padding: 5, 
        marginStart: 38,   
        width: '75%',     
      },      
});

export default InformAddress;