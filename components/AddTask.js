import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Switch,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { TasksContext } from "../Helper/Context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import DueDate from "./DueDate";
import Reminder from "./Reminder";
import { auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AntDesign } from "@expo/vector-icons";

const AddTask = ({ isComplete }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const currentUser = auth.currentUser;
  const userRef = doc(db, "users", currentUser.uid);
  const tasksRef = collection(userRef, "tasks");

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
          ownerId: currentUser.uid,
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
      <View style={styles.taskInput}>
        <TextInput
          style={{ paddingLeft: 5, width: "90%" }}
          placeholder="Add Task..."
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <Pressable onPress={addTask}>
          <AntDesign name="pluscircle" size={26} color="royalblue" />
        </Pressable>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  taskInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddTask;
