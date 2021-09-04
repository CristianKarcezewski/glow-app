import React, { Component } from 'react'
import {  
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from "react-native-vector-icons/FontAwesome";
import ActionButton from "react-native-action-button";
import Image from '../../assets/today.jpg'
import commonStyles from '../../shared/commonStyles'
import Task from './Task'
import AddTask from './AddTask'


const initialState = {    
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
};

export default class Schedule extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async() => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const state = JSON.parse(stateString) || initialState
        this.setState(state, this.filterTasks)
    }
    addTask = newTask => {
            if (!newTask.desc || !newTask.desc.trim()) {
                Alert.alert('Dados Invalidos', 'Descrição não informada')
                return
        }
        const tasks = [...this.state.tasks]
        tasks.push({
            id:Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })
        this.setState({ tasks, showAddTask: false}, this.filterTasks)
    }
    deletTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({tasks}, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        }else {
           const pending = task => task.doneAt ===null
           visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState',JSON.stringify(this.state))
    }

    toggleFilter = ()=> {
        this.setState({showDoneTasks: !this.state.showDoneTasks },
            this.filterTasks)
    }
  
    toggleTask = id => {
        const tasks = this.state.tasks.map(task => {
            if (task.id ===id) {
                task = {...task}
                task.doneAt = task.doneAt ? null: new Date()
            }
            return task
        })
        this.setState({ tasks }, this.filterTasks)
    }
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
          <View style={styles.container}>
            <AddTask
              isVisible={this.state.showAddTask}
              onSave={this.addTask}
              onCancel={() => this.setState({ showAddTask: false })}
            />
            <ImageBackground source={Image} style={styles.background}>
              <View style={styles.iconBar}>
                <TouchableOpacity onPress={this.toggleFilter}>
                  <Icon
                    name={this.state.showDoneTasks ? "eye" : "eye-slash"}
                    size={20}
                    color={commonStyles.colors.secondary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.titleBar}>
                <Text style={styles.title}>Hoje</Text>
                <Text style={styles.subtitle}>{today}</Text>
              </View>
            </ImageBackground>

            <View style={styles.taksConteiner}>
              <FlatList
                data={this.state.visibleTasks}
                keyExtractor={(item) => "${item.id}"}
                renderItem={({ item }) => (
                  <Task
                    {...item}
                    toggleTask={this.toggleTask}
                    onDelete={this.deletTask}
                  />
                )}
              />
            </View>
            <ActionButton
              buttonColor={commonStyles.colors.today}
              onPress={() => {
                this.setState({ showAddTask: true });
              }}
            />
          </View>
        );
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
    iconBar: {
        marginTop: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});
