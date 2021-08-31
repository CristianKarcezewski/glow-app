import React, { Component } from "react"
import { View } from "react-native"
import Post from './post'
import ActionButton from "react-native-action-button";
import commonStyles from "../../shared/commonStyles";
  
 export default class Gallery extends Component {
   

    render() {

        const comments = [{           
            commentImage: 'casa de 80mm² 100% construida por nós e .......'
        }]

        return (
          <View style={{ flex: 1 }}>
            <Post
              image={require("../../assets/casa.png")}
              comments={comments}
            />
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
