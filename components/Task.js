import { View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";

const Task = ({ task, navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  const deleteTask = (id) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  return (
    <View style={task.reminder ? styles.withReminder : styles.container}>
      <View style={styles.taskItem}>
        <View style={styles.taskWidth}>
          <Text>{task.task}</Text>
          <View style={styles.dueDate}>
            <Text>Due Date: </Text>
            <Text>{task.dueDate}</Text>
          </View>
        </View>
        <View style={styles.taskButtons}>
          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate("EditTaskScreen", {
                task: task.task,
                id: task.id,
                reminder: task.reminder,
                dueDate: task.dueDate,
              })
            }
          />
          <Button title="Delete" onPress={() => deleteTask(task.id)} />
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
    margin: 1,
  },
  withReminder: {
    borderWidth: 1,
    borderColor: "#000",
    borderLeftColor: "#2ecc71",
    borderLeftWidth: 5,
    borderStyle: "solid",
    margin: 1,
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
});

export default Task;
