import React, { Component } from 'react'
import {  
    View,
    Text, 
    StyleSheet, 
    Image,
     Dimensions,
     Platform,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


class AddPhoto extends Component {

    state = {
        image: null,
    }

    ImagePicker = () => {
        ImagePicker.showImagePicker({
            title: 'Escolha a Imagem',
            maxHeight: 600,
            maxWidth:800
        }, res => {
            if (!res.didCancel){
                this.setState({
                    image:{uri: res.uri, base64: res.data}})
            }  
        })
    }
    save = async () => {
        Alert.alert('Imagem adicionada!')
    }
    
    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                        <Text style={styles.buttomText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity omPres={this.save} style={styles.button}>
                        <Text style={styles.buttomText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop:Platform.OS === 'ios' ? 30: 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width * 3/4,
        backgroundColor: '#EEE',
        marginTop: 10,
    },
    image: {
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').width * 3/4,
        resizeMode: 'center'
    },
    buttom:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
   
})

export default AddPhoto