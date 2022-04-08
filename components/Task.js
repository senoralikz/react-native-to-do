import { View, Text } from "react-native";
import React from "react";

const Task = ({ task }) => {
  return (
    <View>
      <Text>{task.task}</Text>
    </View>
  );
};

export default Task;
