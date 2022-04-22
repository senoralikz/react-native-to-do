import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  Keyboard,
  Switch,
} from "react-native";
import { TasksContext } from "../Helper/Context";
import DueDate from "../components/DueDate";
import Reminder from "../components/Reminder";

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
    <Pressable onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
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
        <Text>
          Current Due Date:{" "}
          {route.params.dueDate !== new Date(0).toLocaleDateString()
            ? route.params.dueDate
            : "No Due Date"}
        </Text>
        <Reminder
          isReminderEnabled={isEnabled}
          toggleSwitch={updateReminderToggle}
        />

        {route.params.completed ? (
          <Text>Completed: Yes</Text>
        ) : (
          <Text>Completed: No</Text>
        )}
        <Button title="Save Changes" onPress={updateTask} />
      </View>
    </Pressable>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
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
