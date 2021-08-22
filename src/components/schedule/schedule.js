import React, { Component } from 'react'
import {  
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native'
import moment from 'moment'
//import 'moment/locale/pt-br'
//import today from '../../assets/today.jpg'
import today from '../../assets/ImagemAgenda.jpg'
import commonStyles from '../commonStyles'
import Task from '../Task'
import  Icon  from 'react-native-vector-icons/FontAwesome'

export default class Schedule extends Component {
 state = {
     tasks: [
            { id: Math.random(), desc: 'Orçar serviço João da Silva',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Iniciar serviço Padaria do Joana',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Orçar serviço João da Silva',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Iniciar serviço Padaria do Joana',
                estimateAt: new Date(), doneAt: null},
                { id: Math.random(), desc: 'Orçar serviço João da Silva',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Iniciar serviço Padaria do Joana',
                estimateAt: new Date(), doneAt: null },
            { id: Math.random(), desc: 'Orçar serviço João da Silva',
                estimateAt: new Date(), doneAt: new Date() },
            { id: Math.random(), desc: 'Iniciar serviço Padaria do Joana',
                estimateAt: new Date(), doneAt: null},
           
        ]
    }

    toggleTask = id => {
        const tasks = this.state.tasks.map(task => {
            if (task.id ===id) {
                task = {...task}
                task.doneAt = task.doneAt ? null: new Date()
            }
            return task
        })
        this.setState({ tasks })
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <ImageBackground source={today} style={styles.background}>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subtitle}>{moment().format('ddd, D [de] MMMM')}</Text>
                        </View>                    
                    </ImageBackground>
                </View>
                <View style={styles.taksConteiner}>
                    <FlatList data = {this.state.tasks}
                        keyExtractor={item => '${item.id}'}
                        renderItem={({item}) => 
                            <Task {...item} toggleTask={this.toggleTask}/>} /> 
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{        
        flex:1,              
    },
    background:{
        //flex:2,
    },
    titleBar: {
        //flex:1,
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    title: {       
        //fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {        
        //fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
        marginTop: 10,
    },
    taksConteiner: {
        flex:10,
        marginTop: 20,        
        alignItems: 'center',
    },
});
