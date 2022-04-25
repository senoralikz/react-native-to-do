import { StyleSheet, Text, View, FlatList } from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";
import Task from "./Task";

const TasksList = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);

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
    <View>
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
        keyExtractor={(item) => item.id}
        style={styles.tasksList}
      />
      {tasks && tasks.every((task) => task.completed === true) && (
        <Text style={{ marginBottom: 505, textAlign: "center" }}>
          Nothing to do
        </Text>
      )}
    </View>
  );
};

export default TasksList;

const styles = StyleSheet.create({
  tasksList: {
    marginTop: 10,
  },
});
