import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState } from "react";

const AddTask = ({ addTask }) => {
  const [text, setText] = useState("");
  return (
    <View>
      <Text>Add a Task</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Add Task..."
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <Button
        title="Add"
        onPress={() => {
          addTask(text);
          setText("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    padding: 5,
  },
});

export default AddTask;
