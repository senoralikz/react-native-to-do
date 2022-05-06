import { useState, useContext, useLayoutEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Keyboard,
  Pressable,
  RefreshControl,
} from "react-native";
import { TasksContext } from "../Helper/Context";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AddTask from "../components/AddTask";
import Task from "../components/Task";
import Header from "../components/Header";
import TasksList from "../components/TasksList";
import { auth } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [isComplete, setIsComplete] = useState(false);

  const user = auth.currentUser;
  const userRef = doc(db, "users", user.uid);
  const tasksRef = collection(userRef, "tasks");
  const q = query(tasksRef, orderBy("createdAt"));

  useEffect(() => {
    const unsubDocs = onSnapshot(q, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => {
          return { ...doc.data(), taskId: doc.id };
        })
      );
    });

    return unsubDocs;
  }, []);

  const updateIsComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          setIsComplete(!task.complete);
          task.complete = isComplete;
          return task;
        }
        return task;
      })
    );
  };

  return (
    <View style={styles.container}>
      <AddTask isComplete={isComplete} />
      <View style={styles.tasksList}>
        {/* <TasksList navigation={navigation} /> */}
        <FlatList
          data={tasks}
          renderItem={({ item }) =>
            !item.completed && (
              <Task
                task={item}
                updateIsComplete={updateIsComplete}
                navigation={navigation}
              />
            )
          }
          keyExtractor={(item) => item.taskId}
        />
        {tasks && tasks.every((task) => task.completed === true) && (
          <Text style={{ marginBottom: 505, textAlign: "center" }}>
            Nothing to do
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  tasksList: {
    paddingHorizontal: 5,
    height: "85%",
  },
});

export default HomeScreen;
