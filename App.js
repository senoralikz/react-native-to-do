import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    {
      task
        ? setTasks((prevTasks) => {
            return [...prevTasks, { id: uuidv4(), task: task }];
          })
        : Alert.alert("Oops!", "There is no task to add", { text: "Ok" });
    }
  };

  return (
    <View style={styles.container}>
      <Text>To Do or Not To Do</Text>
      <View style={styles.tasksData}>
        <AddTask addTask={addTask} />
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Task task={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tasksData: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    width: 300,
  },
});
