import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Switch,
  Keyboard,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { TasksContext } from "../Helper/Context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import DueDate from "./DueDate";
import Reminder from "./Reminder";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getTasks } from "../Helper/firebaseApiFns";

const AddTask = ({ isComplete }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const tasksRef = collection(db, "tasks");

  let dueDate = new Date(0).toLocaleDateString();

  if (showDueDate) {
    dueDate = date.toLocaleDateString();
  }

  const addTask = async () => {
    if (text) {
      try {
        await addDoc(tasksRef, {
          task: text,
          dueDate: dueDate,
          reminder: isReminderEnabled,
          completed: isComplete,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      setText("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Oops!", "There is no task to add", { text: "Ok" });
    }
  };

  const toggleDateSwitch = () => {
    setShowDueDate((previousState) => !previousState);
    {
      showDueDate && setDate(new Date());
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const toggleReminderSwitch = () => {
    setIsReminderEnabled((previousState) => !previousState);
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Add Task..."
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <View style={styles.taskOptions}>
        <DueDate
          showDueDate={showDueDate}
          toggleDateSwitch={toggleDateSwitch}
          date={date}
          onChange={onDateChange}
        />
        <Reminder
          isReminderEnabled={isReminderEnabled}
          toggleSwitch={toggleReminderSwitch}
        />
      </View>
      <Button title="Add" onPress={addTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    // width: 288,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  taskOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddTask;
