import { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { TasksContext } from "../Helper/Context";

const EditTaskScreen = ({
  navigation,
  navigation: { goBack },
  route,
  editTask,
}) => {
  const [text, setText] = useState("");
  const { tasks, setTasks } = useContext(TasksContext);
  return (
    <View>
      <Text>Task: {route.params.task}</Text>
      <Text>ID: {route.params.id}</Text>
      <TextInput
        // placeholder="update task..."
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
