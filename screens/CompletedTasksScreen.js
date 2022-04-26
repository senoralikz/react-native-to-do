import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { useState, useContext, useLayoutEffect, useCallback } from "react";
import { TasksContext } from "../Helper/Context";
import Task from "../components/Task";
import Header from "../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const CompletedTasksScreen = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [refreshing, setRefreshing] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "Completed Tasks",
  //     headerTitle: () => <Header navigation={navigation} />,
  //   });
  // }, [navigation]);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   getTasks();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  return (
    <View style={styles.container}>
      {/* <Header navigation={navigation} /> */}
      <FlatList
        data={tasks}
        renderItem={({ item }) =>
          item.completed && <Task task={item} navigation={navigation} />
        }
        ListEmptyComponent={
          tasks.every((task) => task.completed === false) && (
            <Text style={{ marginBottom: 505, textAlign: "center" }}>
              You Have Not Completed Any Tasks Yet
            </Text>
          )
        }
        keyExtractor={(item) => item.taskId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* {tasks.every((task) => task.completed === false) && (
        <Text style={{ marginBottom: 505, textAlign: "center" }}>
          No Completed Tasks Yet
        </Text>
      )} */}
    </View>
  );
};

export default CompletedTasksScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
});
