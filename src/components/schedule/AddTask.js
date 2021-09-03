import React, { Component } from "react";
import {
  Plataform,
  Modal,
  View,
  Text,
  TextInput,
  // DatePickerIOS,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import moment from "moment";
import commonStyles from "../../shared/commonStyles";
import DateTimePicker from '@react-native-community/datetimepicker'


const initialState = { desc: "", date: new Date(), showDatePicker: false};

export default class AddTask extends Component {

  state = { ...initialState }

  getDatePicker = () => {
    let datePicker = <DateTimePicker value={this.state.date}
    onChange={(_, date) => this.setState ({date, showDatePicker: false})}
    mode='date' />

    const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
    if(Platform.OS=== 'android'){
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>
              {dateString}
            </Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker
  }
  save = () => {
     const newTask = {
       desc: this.state.desc,
       date: this.state.date
     }
     this.props.onSave && this.props.onSave(newTask)
     this.setState({...initialState})
  };

  render() {
    return (
      <Modal
        onRequestClose={this.props.onCancel}
        visible={this.props.isVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa!</Text>
          <TextInput
            placeholder="Informe a decrição..."
            style={styles.input}
            onChangeText={(desc) => this.setState({ desc })}
            value={this.state.desc}
          />
          {this.getDatePicker()}
          {/* <DatePickerIOS
            mode="date"
            date={this.state.date}
            onDateChange={(date) => this.setState({ date })}
          /> */}
          <View
            style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  background: {
    flex: 2,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  header: {
    //fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  input: {
    //fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    marginLeft: 10,
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderColor: "#E3E3E3",
    borderRadius: 6,
  },
  date: {
    //fontFamily:commonStyles.fontFamily,
    fontSize: 18,
    marginLeft: 15,
  },
});
