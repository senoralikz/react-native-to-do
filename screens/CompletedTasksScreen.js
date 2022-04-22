import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";
import { TasksContext } from "../Helper/Context";
import Task from "../components/Task";

const CompletedTasksScreen = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <View style={styles.container}>
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
      {tasks && tasks.every((task) => task.completed === false) && (
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
