import { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { TasksContext } from "../Helper/Context";
import Reminder from "./Reminder";

const EditTaskScreen = ({
  navigation,
  navigation: { goBack },
  route,
  editTask,
}) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState("");
  return (
    <View>
      <Text>Task: {route.params.task}</Text>
      {route.params.reminder ? (
        <Text>Reminder: True</Text>
      ) : (
        <Text>Reminder: False</Text>
      )}
      <Reminder />
      <Text>ID: {route.params.id}</Text>
      <TextInput
        value={text}
        placeholder={route.params.task}
        onChangeText={(value) => setText(value)}
      />
      <Button
        title="Save Changes"
        onPress={() => {
          setTasks(
            tasks.map((task) => {
              if (task.id === route.params.id) {
                task.task = text;
                goBack();
                return task;
              }
              return task;
            })
          );
          setText("");
        }}
      />
    </View>
  );
};

export default EditTaskScreen;
