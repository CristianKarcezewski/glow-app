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
        { id: "0", from: "1", to: "14", message: "Oi bom dia" },
        {
          id: "1",
          from: "1",
          to: "14",
          message: "Conseguiria vir aqui em casa fazer um orçamento?",
        },
        {
          id: "2",
          from: "14",
          to: "1",
          message: "Claro. Que horas vc está em casa?",
        },
      ],
    };
  
  }

  sendMessage() {
    if (this.state.newMessage != "") {
      const nm = {
        id: this.state.messages.length.toString(),
        from: "1",
        to: "14",
        message: this.state.newMessage,
      };
      this.setState({ ...this.state, messages: [...this.state.messages, nm] });
      this.setState({ ...this.state.newMessage, newMessage: "" });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>        
        <View style={{ flex: 9 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.state.messages}
            renderItem={({ item }) => <Message data={item} />}
            inverted={true}
            contentContainerStyle={{ flexDirection: "column-reverse" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "ghostWhite",
            height: 70,
          }}
        >
          <TextInput
            style={style.inputField}
            placeholder="Mensagem"
            onChangeText={(value) => {
              this.setState({ ...this.state, newMessage: value });
            }}
            value={this.state.newMessage}
          />

          <TouchableOpacity
            style={style.sendButton}
            onPress={() => this.sendMessage()}
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
