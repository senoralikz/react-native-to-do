import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { TasksContext } from "../Helper/Context";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Task = ({ task, navigation, updateIsComplete }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [taskComplete, setTaskComplete] = useState(task.complete);

  const deleteTask = (id) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const completedTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          setTaskComplete((prevState) => !prevState);
          task.completed = taskComplete;
          return task;
        }
        return task;
      })
    );
  };

  const leftSwipeActions = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* <Pressable onPress={() => updateIsComplete(task.id)}> */}
        <Pressable onPress={() => completedTask(task.id)}>
          <View
            style={
              !task.complete ? styles.completedButton : styles.incompleteButton
            }
          >
            <Ionicons name="checkmark-done" size={24} color="black" />
            {!task.complete ? <Text>Complete</Text> : <Text>Incomplete</Text>}
          </View>
        </Pressable>
      </View>
    );
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("EditTaskScreen", {
              task: task.task,
              id: task.id,
              reminder: task.reminder,
              dueDate: task.dueDate,
              completed: task.completed,
            })
          }
        >
          <View style={styles.editButton}>
            <AntDesign name="edit" size={24} color="black" />
            <Text>Edit</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => deleteTask(task.id)}>
          <View style={styles.deleteButton}>
            <AntDesign name="delete" size={24} color="black" />
            <Text>Delete</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const swipeFromLeftOpen = () => {
    alert("Swipe from left");
  };

  const swipeFromRightOpen = () => {
    alert("Swipe from right");
  };

  return (
    <Swipeable
      renderLeftActions={leftSwipeActions}
      renderRightActions={rightSwipeActions}
      // onSwipeableRightOpen={swipeFromRightOpen}
      // onSwipeableLeftOpen={swipeFromLeftOpen}
    >
      <View style={task.reminder ? styles.withReminder : styles.container}>
        <View style={styles.taskItem}>
          <Text style={{ width: "50%" }}>{task.task}</Text>
          {task.dueDate !== new Date(0).toLocaleDateString() && (
            <View style={styles.dueDate}>
              <Text>Due Date: </Text>
              <Text>{task.dueDate}</Text>
            </View>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderWidth: 1,
    borderStyle: "solid",
    marginVertical: 3,
    backgroundColor: "#fff",
  },
  withReminder: {
    height: 75,
    borderWidth: 1,
    borderLeftColor: "#2ecc71",
    borderLeftWidth: 5,
    borderStyle: "solid",
    margin: 1,
    backgroundColor: "#fff",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  taskButtons: {
    flexDirection: "row",
  },
  dueDate: {
    flexDirection: "row",
  },
  editButton: {
    height: 75,
    width: 70,
    marginVertical: 3,
    backgroundColor: "#74b9ff",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    height: 75,
    width: 70,
    marginVertical: 3,
    backgroundColor: "#e74c3c",
    alignItems: "center",
    justifyContent: "center",
  },
  completedButton: {
    height: 75,
    width: 70,
    marginVertical: 3,
    justifyContent: "center",
    backgroundColor: "#2ecc71",
    alignItems: "center",
  },
  incompleteButton: {
    height: 75,
    width: 70,
    marginVertical: 3,
    justifyContent: "center",
    backgroundColor: "#9b59b6",
    alignItems: "center",
  },
});

export default Task;
