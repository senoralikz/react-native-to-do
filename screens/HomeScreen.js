import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Keyboard,
  Pressable,
} from "react-native";
import { useContext, useLayoutEffect } from "react";
import { TasksContext } from "../Helper/Context";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AddTask from "../components/AddTask";
import Task from "../components/Task";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [isComplete, setIsComplete] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "To Do or Not To Do",
      headerTitleAlign: "left",
      headerTitleStyle: { fontSize: 20 },
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <MaterialCommunityIcons
            name="account-circle"
            size={28}
            color="black"
          />
        </Pressable>
      ),
      headerBackVisible: false,
    });
  }, [navigation]);

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
    <View style={styles.container}>
      <View style={styles.tasksData}>
        <AddTask isComplete={isComplete} />
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
          // ListEmptyComponent={
          //   <Text style={{ textAlign: "center" }}>Nothing to do</Text>
          // }
          style={styles.tasksList}
        />
        {tasks && tasks.every((task) => task.completed === true) && (
          <Text style={{ marginBottom: 505, textAlign: "center" }}>
            Nothing to do
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: "100%",
    backgroundColor: "#fff",
  },
  tasksData: {
    padding: 5,
    height: "90%",
  },
  tasksList: {
    marginTop: 10,
  },
});

export default HomeScreen;
