import { View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";

const Task = ({ task, navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <View style={task.reminder ? styles.withReminder : styles.container}>
      <View style={styles.taskItem}>
        <View style={styles.taskWidth}>
          <Text style={styles.listTask}>{task.task}</Text>
        </View>
        <View style={styles.taskButtons}>
          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate("EditTaskScreen", {
                task: task.task,
                id: task.id,
                reminder: task.reminder,
              })
            }
          />
          <Button
            title="Delete"
            onPress={() =>
              setTasks(
                tasks.filter((item) => {
                  return item.id !== task.id;
                })
              )
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  withReminder: {
    borderWidth: 1,
    borderColor: "#000",
    borderLeftColor: "#2ecc71",
    borderLeftWidth: 5,
    borderStyle: "solid",
  },
  taskWidth: {
    width: 175,
  },
  listTask: {
    margin: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskButtons: {
    flexDirection: "row",
  },
});

export default Task;
