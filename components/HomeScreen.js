import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";
import AddTask from "./AddTask";
import Task from "./Task";

const HomeScreen = ({ navigation }) => {
  // const [tasks, setTasks] = useState([]);
  const { tasks, setTasks } = useContext(TasksContext);

  // const editTask = (id) => {
  //   setTasks(
  //     tasks.map((task) => {
  //       task.id !== id ? task : console.log(task);
  //     })
  //   );
  // };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.tasksData}>
          <AddTask />
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <Task task={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.noTasks}>Nothing to do</Text>
            }
            style={styles.tasksList}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    height: 500,
    // borderBottomColor: "#000",
    // borderBottomWidth: 1,
    // borderStyle: "solid",
    // alignItems: "center",
  },
  tasksData: {
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#000",
    padding: 5,
    // width: 300,
  },
  tasksList: {
    marginTop: 10,
  },
  noTasks: {
    textAlign: "center",
  },
});

export default HomeScreen;
