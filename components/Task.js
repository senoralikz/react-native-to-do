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
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const Task = ({ task, navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [taskComplete, setTaskComplete] = useState(task.completed);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const completedTask = async (id) => {
    setTaskComplete(!taskComplete);
    await updateDoc(doc(db, "tasks", id), {
      completed: taskComplete,
    });
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
        <Pressable onPress={() => completedTask(task.taskId)}>
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
              taskId: task.taskId,
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
        <Pressable onPress={() => deleteTask(task.taskId)}>
          <View style={styles.deleteButton}>
            <AntDesign name="delete" size={24} color="black" />
            <Text>Delete</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={leftSwipeActions}
      renderRightActions={rightSwipeActions}
      // onSwipeableRightOpen={swipeFromRightOpen}
      // onSwipeableLeftOpen={swipeFromLeftOpen}
    >
      <View style={styles.container}>
        <View style={styles.taskItem}>
          <Text>{task.task}</Text>
          {task.reminder && (
            <Ionicons name="notifications" size={18} color="gold" />
          )}
        </View>
        {task.dueDate !== new Date(0).toLocaleDateString() && (
          <View>
            <Text>Due Date: {task.dueDate}</Text>
          </View>
        )}
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
    marginVertical: 4,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: "row",
    width: "50%",
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
