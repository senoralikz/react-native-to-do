import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Task = ({ task, navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  // const [taskComplete, setTaskComplete] = useState(task.complete);

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
          task.completed = true;
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
        <Pressable onPress={() => completedTask(task.id)}>
          <View style={{ backgroundColor: "#2ecc71", alignItems: "center" }}>
            <Ionicons name="checkmark-done" size={24} color="black" />
            <Text>Complete</Text>
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
          <View style={{ backgroundColor: "#74b9ff", alignItems: "center" }}>
            <AntDesign name="edit" size={24} color="black" />
            <Text>Edit</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => deleteTask(task.id)}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#e74c3c",
            }}
          >
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
          <View style={styles.taskWidth}>
            <Text>{task.task}</Text>
            {task.dueDate !== new Date(0).toLocaleDateString() && (
              <View style={styles.dueDate}>
                <Text>Due Date: </Text>
                <Text>{task.dueDate}</Text>
              </View>
            )}
          </View>
          <View style={styles.taskButtons}></View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    margin: 1,
    backgroundColor: "#fff",
  },
  withReminder: {
    borderWidth: 1,
    borderColor: "#000",
    borderLeftColor: "#2ecc71",
    borderLeftWidth: 5,
    borderStyle: "solid",
    margin: 1,
    backgroundColor: "#fff",
  },
  taskWidth: {
    width: 175,
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
    backgroundColor: "#3498db",
  },
  completedButton: {
    backgroundColor: "#2ecc71",
  },
});

export default Task;
