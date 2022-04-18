import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native";
import { TasksContext } from "../Helper/Context";
import DueDate from "./DueDate";
import Reminder from "./Reminder";

const EditTaskScreen = ({ navigation: { goBack }, route }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState(route.params.task);
  const [isEnabled, setIsEnabled] = useState(route.params.reminder);
  const [updateDate, setUpdateDate] = useState(new Date(route.params.dueDate));
  const [updateDateToggle, setUpdateDateToggle] = useState(() =>
    route.params.dueDate !== new Date(0).toLocaleDateString() ? true : false
  );

  // setUpdateDateToggle(() => {
  //   updateDate.toLocaleDateString() !== new Date(0).toLocaleDateString()
  //     ? true
  //     : false;
  // });

  const onUpdateDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setUpdateDate(currentDate);
  };

  const updateReminderToggle = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const updateDueDateToggle = () => {
    setUpdateDateToggle((previousState) => !previousState);
  };

  const updateTask = () => {
    setTasks(
      tasks.map((task) => {
        if (task.id === route.params.id) {
          if (text) {
            task.task = text;
            task.reminder = isEnabled;
            {
              updateDateToggle
                ? (task.dueDate = updateDate.toLocaleDateString())
                : (task.dueDate = new Date(0).toLocaleDateString());
            }
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <DueDate
          date={updateDate}
          showDueDate={updateDateToggle}
          toggleDateSwitch={updateDueDateToggle}
          onChange={onUpdateDateChange}
        />
        {route.params.dueDate !== new Date(0).toLocaleDateString() && (
          <Text>Current Due Date: {route.params.dueDate}</Text>
        )}
        <Reminder
          isReminderEnabled={isEnabled}
          toggleSwitch={updateReminderToggle}
        />

        <Text>ID: {route.params.id}</Text>
        <Button title="Save Changes" onPress={updateTask} />
      </View>
    </TouchableWithoutFeedback>
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
