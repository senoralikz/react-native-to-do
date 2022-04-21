import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { useContext } from "react";
import { TasksContext } from "../Helper/Context";
import Swipeable from "react-native-gesture-handler/Swipeable";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AddTask from "./AddTask";
import Task from "./Task";

const HomeScreen = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <View style={styles.container}>
      <View style={styles.tasksData}>
        <AddTask />
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Task task={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.noTasks}>Nothing to do</Text>}
          style={styles.tasksList}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    height: 500,
  },
  tasksData: {
    padding: 5,
  },
  tasksList: {
    marginTop: 10,
  },
  noTasks: {
    textAlign: "center",
  },
});

export default HomeScreen;
