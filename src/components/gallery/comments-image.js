import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert
} from 'react-native'


class CommentsImage extends Component {
    render () {
        let view = null
        if (this.props.comments) {
            view = this.props.comments.map((item, index) => {
                return (
                  <View style={styles.commetContainer} Key={index}>
                    {/* <Text style={styles.titlename}>{item.titlename}:</Text> */}
                    <Text style={styles.comment}>{item.comment}</Text>
                  </View>
                );
            })
        }
        return (
          <View style={styles.container}>
            {View}
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    commetContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    titlename: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#444',
    },
    Comment: {
        color: '#555',
    },

})
export default CommentsImage;