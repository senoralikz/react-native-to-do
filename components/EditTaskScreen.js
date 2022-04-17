import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Switch,
} from "react-native";
import { TasksContext } from "../Helper/Context";
import Reminder from "./Reminder";

const EditTaskScreen = ({ navigation: { goBack }, route }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState(route.params.task);
  const [isEnabled, setIsEnabled] = useState(route.params.reminder);

  // const toggleSwitch = () => setReminder((previousState) => !previousState);
  const updateReminder = () => setIsEnabled((previousState) => !previousState);

  // Alert.alert("Oops!", "You can't leave the task field empty", {
  //   text: "Ok",
  // });

  const updateTask = () => {
    setTasks(
      tasks.map((task) => {
        if (task.id === route.params.id) {
          if (text) {
            task.task = text;
            task.reminder = isEnabled;
            setText("");
            goBack();
            return task;
          } else {
            Alert.alert("Oops!", "You can't leave the task field empty", {
              text: "Ok",
            });
          }
        }
        return task;
      })
    );
  };

  return (
    <View>
      <View style={styles.taskHeader}>
        <Text>Task: </Text>
        <TextInput
          value={text}
          placeholder={route.params.task}
          onChangeText={(value) => setText(value)}
          style={styles.taskInput}
        />
      </View>
      {isEnabled ? <Text>Reminder: On</Text> : <Text>Reminder: Off</Text>}
      <Reminder isReminderEnabled={isEnabled} toggleSwitch={updateReminder} />
      {/* <Switch
        ios_backgroundColor="#3e3e3e"
        onValueChange={updateReminder}
        value={isEnabled}
      /> */}
      <Text>ID: {route.params.id}</Text>
      {/* <TextInput
        value={text}
        placeholder={route.params.task}
        onChangeText={(value) => setText(value)}
      /> */}
      <Button title="Save Changes" onPress={updateTask} />
    </View>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({
  taskHeader: {
    flexDirection: "row",
  },
  taskInput: {
    width: 150,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
});
