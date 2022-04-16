import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { TasksContext } from "../Helper/Context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ addTask }) => {
  const [text, setText] = useState("");
  const { tasks, setTasks } = useContext(TasksContext);

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
        <Button
          title="Add"
          onPress={() => {
            if (text) {
              setTasks((prevTasks) => {
                return [...prevTasks, { id: uuidv4(), task: text }];
              });
              console.log(tasks);
              setText("");
            } else {
              Alert.alert("Oops!", "There is no task to add", { text: "Ok" });
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskText: {
    textAlign: "center",
  },
  addTaskForm: {
    flexDirection: "row",
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
