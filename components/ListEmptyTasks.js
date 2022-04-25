import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";

const ListEmptyTasks = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  return (
    <View>
      {tasks.every((task) => task.completed === true) ? (
        <Text style={{ marginBottom: 505, textAlign: "center" }}>
          Nothing to do
        </Text>
      ) : (
        <Text style={{ marginBottom: 505, textAlign: "center" }}>
          You Have Not Completed Any Tasks Yet
        </Text>
      )}
    </View>
  );
};

export default ListEmptyTasks;

const styles = StyleSheet.create({});
