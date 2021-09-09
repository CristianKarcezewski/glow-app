import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import commonStyles from "../../shared/commonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
  let check = null;
  if (props.doneAT !== null) {
    check = (
      <View style={styles.done}>
        <Icon name="check" size={20} color={commonStyles.colors.secondary} />
      </View>
    );
  }
  if (props.doneAt === null) {
    check = <View style={styles.pending} />;
  }

  const doneOrNotStyle =
    props.doneAt !== null ? { textDecorationLine: "line-through" } : {};

  const date = props.doneAT ? props.doneAT : props.estimateAt;

  const formattedDate = moment(date)
    .locale("pt-br")
    .format("ddd, D [de] MMMM [de] YYYY");

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
        <View style={styles.checkContainer}>{check}</View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={[styles.description, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => props.onDelete && props.onDelete(props.id)}
      >
        <FontAwesomeIcon icon={faTrash} size={25} color={"#db382f"} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
    justifyContent: "space-around",
  },
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  pending: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: "#555",
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    //fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
    width: 250,
  },
  date: {
    //fontSize: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
});
