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
import { db, auth } from "../firebaseConfig";

const Task = ({ task, navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [taskComplete, setTaskComplete] = useState(task.completed);

  const currentUser = auth.currentUser;
  const userRef = doc(db, "users", currentUser.uid);
  const tasksRef = collection(userRef, "tasks");

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(tasksRef, id));
    } catch (error) {
      Alert.alert(Alert.alert(error.code, error.message, { text: "Ok" }));
    }
  };

  const completedTask = async (id) => {
    setTaskComplete(!taskComplete);
    await updateDoc(doc(tasksRef, id), {
      completed: taskComplete,
    });
  };

  const leftSwipeActions = () => {
    return (
      <View style={styles.taskOptionBtns}>
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
      <View style={styles.taskOptionBtns}>
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
        <View style={styles.taskInfo}>
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
    // width: "90%",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
    marginVertical: 4,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    padding: 10,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  taskInfo: {
    flexDirection: "row",
    width: "50%",
  },
  taskOptionBtns: {
    flexDirection: "row",
    height: 75,
    // width: 75,
    marginVertical: 4,
    marginHorizontal: 5,
    // justifyContent: "center",
    // alignItems: "flex-start",
  },
  editButton: {
    height: "100%",
    width: 60,
    marginRight: 3,
    backgroundColor: "#74b9ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20,
    borderColor: "#0984e3",
  },
  deleteButton: {
    height: "100%",
    width: 60,
    // marginVertical: 3,
    backgroundColor: "#e74c3c",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20,
    borderColor: "#c0392b",
  },
  completedButton: {
    height: "100%",
    width: 75,
    // marginVertical: 3,
    justifyContent: "center",
    backgroundColor: "#2ecc71",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20,
    borderColor: "#27ae60",
  },
  incompleteButton: {
    height: "100%",
    width: 70,
    // marginVertical: 3,
    justifyContent: "center",
    backgroundColor: "#9b59b6",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20,
    borderColor: "#8e44ad",
  },
});

export default Task;
