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
import { doc, updateDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const EditTaskScreen = ({ navigation: { goBack }, route }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState(route.params.task);
  const [isEnabled, setIsEnabled] = useState(route.params.reminder);
  const [updateDate, setUpdateDate] = useState(new Date(route.params.dueDate));
  const [updateDateToggle, setUpdateDateToggle] = useState(() =>
    route.params.dueDate !== new Date(0).toLocaleDateString() ? true : false
  );

  const currentUser = auth.currentUser;
  const userRef = doc(db, "users", currentUser.uid);
  const tasksRef = collection(userRef, "tasks");

  const onUpdateDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setUpdateDate(currentDate);
  };

  const updateReminderToggle = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const updateDueDateToggle = () => {
    setUpdateDateToggle((previousState) => !previousState);
    {
      updateDateToggle && setUpdateDate(new Date());
    }
  };

  const updateTask = async () => {
    if (text) {
      let newDueDate;
      if (updateDateToggle) {
        newDueDate = updateDate.toLocaleDateString();
      } else {
        newDueDate = new Date(0).toLocaleDateString();
      }
      try {
        //
        await updateDoc(doc(tasksRef, route.params.taskId), {
          task: text,
          reminder: isEnabled,
          dueDate: newDueDate,
        })
          .then(setText(""))
          .then(goBack());
      } catch (error) {
        console.error("could not update", error);
        Alert.alert("Oops!", error, {
          text: "Ok",
        });
      }
    } else {
      Alert.alert("Oops!", "You can't leave the task field empty", {
        text: "Ok",
      });
    }
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
