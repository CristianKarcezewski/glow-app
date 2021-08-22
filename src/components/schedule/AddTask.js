import React, {component} from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    DatePickerIOS,
    StylesSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
}from 'react-native'
import moment from 'moment'
import commonStyles from './commonStyles'

const initialState = { desc: '', date: new Date()}

export default class AddTask extends Component {

    state = { ...initialState}

    save = () => {
        const data = { ...this.state }
        this.props.onSave(data)
        this.srtState({...initialState})
    }
    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa!</Text>
                    <TextInput placeholder="Decrição..." stylke={styles.input}
                        onChangeText={desc => this.setState({desc})}
                        value={this.state.desc}/>
                    <DatePickerIOS mode='date' date={this.state.date}
                        onDateChange={date => this.setState({date})}/>
                    <View style={{
                        flexDirection:'row',
                        justifyContent: 'flex-end'
                    }}>
                    <TouchableOpacity omPress={this.props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity omPress={this.save}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>                         
                    </View>   
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={Styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )

    }
}

var styles = StylesSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7',
    },
    botton: {
        margin: 20,
        marginRight:30,
        color: commonStyles.colore.default,
    },
    headers: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.secondary,
        textAlin: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        bordeColor: 1,
        borderRadius: 6
    },
})