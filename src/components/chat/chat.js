import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      messages: [
        { id: "1", from: "1", to: "14", message: "Oi bom dia" },
        {
          id: "2",
          from: "1",
          to: "14",
          message: "Conseguiria vir aqui em casa fazer um orçamento?",
        },
        {
          id: "3",
          from: "14",
          to: "1",
          message: "Claro. Que horas vc está em casa?",
        },
      ],
    };
  }

  sendMessage(value) {
    this.setState(...this.state.messages, {
      id: "5",
      from: "1",
      to: "14",
      message: value,
    });
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.companyName,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 9 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.messages}
            renderItem={({ item }) => <Message data={item} />}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "ghostWhite",
          }}
        >
          <TextInput
            style={style.inputField}
            placeholder="Mensagem"
            onChangeText={(value) =>
              this.setState({ ...this.state, newMessage: value })
            }
          />
          <TouchableOpacity
            style={style.sendButton}
            onPress={() => this.sendMessage(this.state.newMessage)}
          >
            <FontAwesomeIcon icon={faPaperPlane} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Message extends Component {
  render() {
    return (
      <View
        style={
          this.props.data.from === "1"
            ? style.myContainer
            : style.otherContainer
        }
      >
        <Text
          style={this.props.data.from === "1" ? style.myName : style.otherName}
        >
          {this.props.data.from == "1" ? "Você" : "João"}
        </Text>
        <Text
          style={
            this.props.data.from === "1" ? style.myMessage : style.otherMessage
          }
        >
          {this.props.data.message}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  myContainer: {
    borderColor: "#db382f",
    borderWidth: 1,
    maxWidth: "80%",
    alignSelf: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 5,
    elevation: 10,
    backgroundColor: "#fff",
  },
  myName: {
    alignSelf: "flex-end",
    borderBottomColor: "#db382f",
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  myMessage: {
    fontSize: 16,
    alignSelf: "flex-end",
  },
  otherContainer: {
    borderColor: "#db382f",
    borderWidth: 1,
    maxWidth: "80%",
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 5,
    elevation: 10,
    backgroundColor: "#fff",
  },
  otherName: {
    alignSelf: "flex-start",
    borderBottomColor: "#db382f",
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  otherMessage: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  inputField: {
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chat;
