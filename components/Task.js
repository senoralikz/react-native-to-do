import { View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";

const Task = ({ task, navigation, editTask }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <View style={styles.taskItem}>
      <View style={styles.taskWidth}>
        <Text style={styles.listTask}>{task.task}</Text>
      </View>
      <View style={styles.taskButtons}>
        <Button
          title="Edit"
          onPress={() =>
            navigation.navigate(
              "EditTaskScreen",
              {
                task: task.task,
                id: task.id,
              },
              editTask
            )
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
  );
};

const styles = StyleSheet.create({
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
