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
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebaseConfig";
import { getTasks } from "../Helper/firebaseApiFns";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [isComplete, setIsComplete] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    getTasks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTasks();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getTasks = async () => {
    try {
      await getDocs(collection(db, "tasks")).then((response) => {
        // console.log("this is the collection of tasks", response.docs)
        let gettingTasks = [];
        response.docs.forEach((doc) => {
          if (doc.data().userId === currentUser.uid) {
            gettingTasks.push({ ...doc.data(), taskId: doc.id });
          }
        });
        setTasks(gettingTasks);
        console.log(gettingTasks);
      });
    } catch (error) {
      console.error("could not get tasks:", error);
    }
  };

  const getCurrentUser = () => {
    if (currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      console.log("this is the current user:", currentUser);
    } else {
      // No user is signed in.
      console.log("could not get current user");
    }
  };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "To Do or Not To Do",
  //     headerTitle: () => <Header navigation={navigation} />,
  //     headerBackVisible: false,
  //   });
  // }, [navigation]);

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
      {/* <Button title="Get Current User" onPress={getCurrentUser} /> */}
      <View style={styles.tasksData}>
        <AddTask isComplete={isComplete} />
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
          ListEmptyComponent={
            tasks.every((task) => task.completed === true) && (
              <Text style={{ marginBottom: 505, textAlign: "center" }}>
                Nothing to do
              </Text>
            )
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.tasksList}
        />
        {/* {tasks && tasks.every((task) => task.completed === true) && (
          <Text style={{ marginBottom: 505, textAlign: "center" }}>
            Nothing to do
          </Text>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: "100%",
    backgroundColor: "#fff",
  },
  tasksData: {
    padding: 5,
    height: "90%",
  },
});

export default HomeScreen;
