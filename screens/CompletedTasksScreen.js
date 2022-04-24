import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { TasksContext } from "../Helper/Context";
import Task from "../components/Task";
import Header from "../components/Header";

const CompletedTasksScreen = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "Completed Tasks",
  //     headerTitle: () => <Header navigation={navigation} />,
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Header navigation={navigation} /> */}
      <FlatList
        data={tasks}
        renderItem={({ item }) =>
          item.completed && <Task task={item} navigation={navigation} />
        }
        keyExtractor={(item) => item.id}
        // ListEmptyComponent={
        //   <Text style={{ textAlign: "center" }}>No Completed Tasks Yet</Text>
        // }
      />
      {tasks.every((task) => task.completed === false) && (
        <Text style={{ marginBottom: 505, textAlign: "center" }}>
          No Completed Tasks Yet
        </Text>
      )}
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
