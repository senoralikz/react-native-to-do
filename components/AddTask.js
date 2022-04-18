import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Switch,
} from "react-native";
import React, { useState, useContext } from "react";
import { TasksContext } from "../Helper/Context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import DueDate from "./DueDate";
import Reminder from "./Reminder";

const AddTask = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [date, setDate] = useState(new Date());

  let dueDate = new Date(0).toLocaleDateString();

  if (showDueDate) {
    dueDate = date.toLocaleDateString();
  }

  const addTask = () => {
    if (text) {
      setTasks((prevTasks) => {
        return [
          ...prevTasks,
          {
            id: uuidv4(),
            task: text,
            dueDate: dueDate,
            // if(showDueDate) {
            //   dueDate: date.toLocaleDateString()
            // } else {
            //   dueDate: '--/--/--'
            // },
            reminder: isReminderEnabled,
          },
        ];
      });
      console.log(tasks);
      setText("");
      // setShowDueDate(false);
      // setIsReminderEnabled(false);
    } else {
      Alert.alert("Oops!", "There is no task to add", { text: "Ok" });
    }
  };

  const toggleDateSwitch = () => {
    setShowDueDate((previousState) => !previousState);
    if (showDueDate === false) {
      // setDate(0);
      // console.log(date);
      console.log("there is no due date");
    } else {
      setDate(new Date());
      console.log(date);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // setShow(false);
    setDate(currentDate);
  };

  const toggleReminderSwitch = () => {
    setIsReminderEnabled((previousState) => !previousState);
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Add Task..."
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <View style={styles.taskOptions}>
        <DueDate
          showDueDate={showDueDate}
          toggleDateSwitch={toggleDateSwitch}
          date={date}
          onChange={onDateChange}
        />
        <Reminder
          isReminderEnabled={isReminderEnabled}
          toggleSwitch={toggleReminderSwitch}
        />
      </View>
      <Button title="Add" onPress={addTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    // width: 288,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  taskOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddTask;
