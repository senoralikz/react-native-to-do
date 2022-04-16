import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { TasksContext } from "../Helper/Context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import Reminder from "./Reminder";

const AddTask = ({ addTask }) => {
  const [text, setText] = useState("");
  const { tasks, setTasks } = useContext(TasksContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <Text style={styles.addTaskText}>Add a Task</Text>
      <View style={styles.addTaskForm}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Task..."
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </View>
      <Reminder isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
      <Button
        title="Add"
        onPress={() => {
          if (text) {
            setTasks((prevTasks) => {
              return [
                ...prevTasks,
                { id: uuidv4(), task: text, reminder: isEnabled },
              ];
            });
            console.log(tasks);
            setText("");
          } else {
            Alert.alert("Oops!", "There is no task to add", { text: "Ok" });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskText: {
    textAlign: "center",
  },
  addTaskForm: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  textInput: {
    width: 245,
    padding: 5,
  },
});

export default AddTask;
